// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Deserialize a DNS packet.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('DNSPacketDeserializer');

goog.require('DNSPacket');
goog.require('DNSRecord');
goog.require('DNSRecordA');
goog.require('DNSRecordAAAA');
goog.require('DNSRecordCNAME');
goog.require('DNSRecordMX');
goog.require('DNSRecordTXT');
goog.require('DNSUtil');
goog.require('Deserializer');

/**
 * Take an ArrayBuffer of binary data from a socket and parse a DNSPacket.
 * @param {ArrayBuffer} arBuffer ArrayBuffer of binary data representing a
 *                               DNS packet.
 * @param {ResponseLabelPointerManager} lblPointManager Reassemble compressed
 *                                                      DNS names.
 * @constructor
 */
DNSPacketDeserializer = function(arBuffer, lblPointManager) {
  this.dataDeserializer_ = new Deserializer(arBuffer);
  this.lblPointManager_ = lblPointManager;
};


/**
 * Parsed and deserialized DNS packet.
 * @type {DNSPacket}
 * @private
 */
DNSPacketDeserializer.prototype.dataDeserializer_ = null;


/**
 * Parsed and deserialized DNS packet.
 * @type {DNSPacket}
 * @private
 */
DNSPacketDeserializer.prototype.deserializedPacket_ = null;


/**
 * Parse binary data from an ArrayBuffer and store it as a DNSPacket.
 */
DNSPacketDeserializer.prototype.deserializePacket = function() {
  // check the initial two bytes of the packet, which must start with 0s
  var firstTwoBytes = this.dataDeserializer_.short();
  if (firstTwoBytes) {
    //TODO: Implement more sanity checks and process errors
    console.log('DNS packet must start with 00 00');
  }

  // Most DNS servers will return a UDP packet such that
  // the value of flags is something like "33152"
  // (flags will be an integer decimal)
  // when "33152" is converted to binary, the value is:
  // "1000000110000000" This is 16 bits or 2 bytes
  var flags = this.dataDeserializer_.short();

  // determine how many DNS records will be in each section of the DNS packet
  var sectionCount = {};
  sectionCount[DNSUtil.PacketSection.QUESTION] = this.dataDeserializer_.short();
  sectionCount[DNSUtil.PacketSection.ANSWER] = this.dataDeserializer_.short();
  sectionCount[DNSUtil.PacketSection.AUTHORITY] =
    this.dataDeserializer_.short();
  sectionCount[DNSUtil.PacketSection.ADDITIONAL] =
    this.dataDeserializer_.short();

  var packet = new DNSPacket(flags);

  // Parse the QUESTION section.
  for (var qI = 0; qI < sectionCount[DNSUtil.PacketSection.QUESTION]; ++qI) {
    var part = new DNSRecord(
      // dns record name
      this.parseName(this.lblPointManager_, this.dataDeserializer_),

      // dns record type
      this.dataDeserializer_.short(),

      // dns record class
      this.dataDeserializer_.short());

    // set label point manager so individual record has access to entire
    // response packet to reassemble compressed DNS names
    part.setLblPointManager(this.lblPointManager_);

    // add DNS record to broader DNS packet
    packet.push('qd', part);
  }

  // Parse the ANSWER, AUTHORITY and ADDITIONAL sections.
  var parseSections = [DNSUtil.PacketSection.ANSWER,
                         DNSUtil.PacketSection.AUTHORITY,
                         DNSUtil.PacketSection.ADDITIONAL];

  parseSections.forEach(function(section) {
    for (var aI = 0; aI < sectionCount[section]; ++aI) {

      // See Section 3.2.1 in RFC 1035.
      var recName = this.parseName(this.lblPointManager_,
                                     this.dataDeserializer_);
      var recType = this.dataDeserializer_.short();
      var recClass = this.dataDeserializer_.short();
      var recTTL = this.dataDeserializer_.getLong();

      // obtain the length of the resource record data section
      // See RDLENGTH of Section 3.2.1 in RFC 1035.
      var dtSectLength = this.dataDeserializer_.short();
      var dtSectBinary = this.dataDeserializer_.slice(dtSectLength);

      // create the proper DNS record type
      switch (recType) {
        case DNSUtil.RecordNumber.A:
          var part = new DNSRecordA(recName, recTTL);
          break;

        case DNSUtil.RecordNumber.MX:
          var part = new DNSRecordMX(recName, recTTL);
          break;

        case DNSUtil.RecordNumber.AAAA:
          var part = new DNSRecordAAAA(recName, recTTL);
          break;

        case DNSUtil.RecordNumber.TXT:
          var part = new DNSRecordTXT(recName, recTTL);
          break;

        case DNSUtil.RecordNumber.CNAME:
          var part = new DNSRecordCNAME(recName, recTTL);
          break;

        default:
          var part = new DNSRecord(recName,
                                 recType,
                                 recClass,
                                 recTTL,
                                 dtSectBinary);
          break;
      }

      // set label point manager so individual record has access to entire
      // response packet to reassemble compressed DNS names
      part.setLblPointManager(this.lblPointManager_);
      part.setData(dtSectBinary);

      // parse data section of record and set it as part of the record
      // specifics of parsing data section depend in part on record type
      this.parseDataSection(recType, dtSectBinary, part);

      // push the the record onto the DNS packet
      packet.push(section, part);
    }
  }.bind(this));

  this.dataDeserializer_.isEOF_() || console.warn('was not EOF on packet');
  this.deserializedPacket_ = packet;
};


/**
 * Parse the data section of a DNS packet, reassembling DNS names based upon
 *   DNS compression and parsing based upon various record types.
 * Set the parsed data section into the DNS record and set any associated
 *   fields.
 * @param {DNSUtil.RecordNumber} recordTypeNum DNS record type number.
 * @param {ArrayBuffer} dataSectionBinary Binary data of data section.
 * @param {DNSPacket} dnsPacket DNS packet to parse.
 */
DNSPacketDeserializer.prototype.parseDataSection = function(recordTypeNum,
                                                            dataSectionBinary,
                                                            dnsPacket) {
  var dataSectionDeserializer = new Deserializer(dataSectionBinary);
  var dataSectionTxt = '';

  switch (recordTypeNum) {
    case DNSUtil.RecordNumber.A:
      var arrOctect = [];
      while (!dataSectionDeserializer.isEOF_()) {
        arrOctect.push(dataSectionDeserializer.byte_());
      }
      dataSectionTxt = arrOctect.join('.');
      dnsPacket.setIp(dataSectionTxt);
      break;

    case DNSUtil.RecordNumber.AAAA:
      // take 16 byte data and parse into the 16 bytes of an IPv6 address
      var nibbleNum = 0;
      while (!dataSectionDeserializer.isEOF_()) {
        var nextByte = dataSectionDeserializer.byte_();
        var nibbleADec = (nextByte & 0xf0) >> 4;
        var nibbleAHex = Util.baseConversion(nibbleADec, 16);
        nibbleNum++;

        var nibbleBDec = nextByte & 0x0f;
        var nibbleBHex = Util.baseConversion(nibbleBDec, 16);
        nibbleNum++;

        dataSectionTxt += nibbleAHex + nibbleBHex;
        if (nibbleNum % 4 == 0 && nibbleNum < 32) dataSectionTxt += ':';
        dnsPacket.setIp(dataSectionTxt);
      }
      break;

    case DNSUtil.RecordNumber.CNAME:
      dataSectionTxt += this.parseName(this.lblPointManager_,
                                       dataSectionDeserializer);
      dnsPacket.setCname(dataSectionTxt);
      break;

    case DNSUtil.RecordNumber.TXT:
      while (!dataSectionDeserializer.isEOF_()) {
        var nextByte = dataSectionDeserializer.byte_();
        var nextChar = String.fromCharCode(nextByte);
        dataSectionTxt += nextChar;
      }
      dnsPacket.setText(dataSectionTxt);
      break;

     case DNSUtil.RecordNumber.MX:
       var preferenceNum = dataSectionDeserializer.short();
       var mailExchanger = this.parseName(this.lblPointManager_,
                                          dataSectionDeserializer);
       dnsPacket.setPreferenceNumber(preferenceNum);
       dnsPacket.setMailExchanger(mailExchanger);
       dataSectionTxt += 'Pref #: ' + preferenceNum;
       dataSectionTxt += '; Value: ' + mailExchanger;
       break;
  }
  dnsPacket.setData(dataSectionTxt);
};


/**
 * Parse a DNS name, which will either finish with a NULL byte or a suffix
 * reference (i.e., 0xc0 <ref>).
 * @param {ResponseLabelPointerManager} lblPtManager Reassemble compressed
 *                                                   DNS names.
 * @param {Deserializer} nameDeserializer Deserializer used to parse name.
 * @return {string} Parsed and re-assembled DNS name.
 */
DNSPacketDeserializer.prototype.parseName = function(lblPtManager,
                                                     nameDeserializer) {
  var parts = [];
  for (;;) {
    var len = nameDeserializer.byte_();

    // Examine the length bit to determine whether what is coming is
    // a label reference or a length of a name.
    if (!len) {
      // TODO: quitting
      break;
    } else if (len == 0xc0) {
      // TODO: It is technically only the high order two bits of the 16 bit
      // section that need to be ones... a label could be very large, so
      // checking against 0xc0 isn't 100% safe

      var ref = nameDeserializer.byte_();
      var nameSubstitution = lblPtManager.getNameFromReference(ref);
      parts.push(nameSubstitution);
      break;
    }

    // consume a DNS name
    var v = '';
    while (len-- > 0) {
      var nextByte = nameDeserializer.byte_();
      var nextChar = String.fromCharCode(nextByte);
      v += nextChar;
    }
    parts.push(v);
  }
  return parts.join('.');
};


/**
 * Return the parsed DNS packet.
 * @return {DNSPacket} Parsed DNS packet with associated DNS records.
 */
DNSPacketDeserializer.prototype.getDeserializedPacket = function() {
  return this.deserializedPacket_;
};
