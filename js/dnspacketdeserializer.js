// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Deserialize a DNS packet.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSPacketDeserializer');

goog.require('netdebugger.DNSPacket');
goog.require('netdebugger.DNSRecord');
goog.require('netdebugger.DNSRecordA');
goog.require('netdebugger.DNSRecordAAAA');
goog.require('netdebugger.DNSRecordCNAME');
goog.require('netdebugger.DNSRecordMX');
goog.require('netdebugger.DNSRecordTXT');
goog.require('netdebugger.DNSUtil');
goog.require('netdebugger.Deserializer');

/**
 * Take an ArrayBuffer of binary data from a socket and parse a DNSPacket.
 * @param {Uint8Array|ArrayBuffer} arBuffer Uint8Array of binary data
 *                                          representing a DNS packet.
 * @param {ResponseLabelPointerManager} lblPointManager Reassemble compressed
 *                                                      DNS names.
 * @constructor
 */
netdebugger.DNSPacketDeserializer = function(arBuffer, lblPointManager) {
  this.dataDeserializer_ = new netdebugger.Deserializer(arBuffer);
  this.lblPointManager_ = lblPointManager;
};


/**
 * Deserializer to unpack a DNSPacket.
 * @type {netdebugger.Deserializer}
 * @private
 */
netdebugger.DNSPacketDeserializer.prototype.dataDeserializer_ = null;


/**
 * Parsed and deserialized DNS packet.
 * @type {netdebugger.DNSPacket}
 * @private
 */
netdebugger.DNSPacketDeserializer.prototype.deserializedPacket_ = null;


/**
 * Parse binary data from an ArrayBuffer and store it as a DNSPacket.
 */
netdebugger.DNSPacketDeserializer.prototype.deserializePacket = function() {
  // check the initial two bytes of the packet, which must start with 0s
  var firstTwoBytes = this.dataDeserializer_.getShort();
  if (firstTwoBytes) {
    //TODO: Implement more sanity checks and process errors
    console.warn('DNS packet must start with 00 00');
  }

  // Most DNS servers will return a UDP packet such that
  // the value of flags is something like "33152"
  // (flags will be an integer decimal)
  // when "33152" is converted to binary, the value is:
  // "1000000110000000" This is 16 bits or 2 bytes
  var flags = this.dataDeserializer_.getShort();

  // determine how many DNS records will be in each section of the DNS packet
  var sectionCount = {};
  sectionCount[netdebugger.DNSUtil.PacketSection.QUESTION] =
    this.dataDeserializer_.getShort();
  sectionCount[netdebugger.DNSUtil.PacketSection.ANSWER] =
    this.dataDeserializer_.getShort();
  sectionCount[netdebugger.DNSUtil.PacketSection.AUTHORITY] =
    this.dataDeserializer_.getShort();
  sectionCount[netdebugger.DNSUtil.PacketSection.ADDITIONAL] =
    this.dataDeserializer_.getShort();

  var packet = new netdebugger.DNSPacket(flags);

  // Parse the QUESTION section.
  for (var qI = 0; qI < sectionCount[netdebugger.DNSUtil.PacketSection.QUESTION]; ++qI) {
    var dnsRecord = new netdebugger.DNSRecord(
      // dns record name
      this.parseName(this.lblPointManager_, this.dataDeserializer_),

      // dns record type
      this.dataDeserializer_.getShort(),

      // dns record class
      this.dataDeserializer_.getShort());

    // set label point manager so individual record has access to entire
    // response packet to reassemble compressed DNS names
    dnsRecord.setLblPointManager(this.lblPointManager_);

    // add DNS question record to broader DNS packet
    packet.push(netdebugger.DNSUtil.PacketSection.QUESTION, dnsRecord);
  }

  // Parse the ANSWER, AUTHORITY and ADDITIONAL sections.
  var parseSections = [netdebugger.DNSUtil.PacketSection.ANSWER,
                       netdebugger.DNSUtil.PacketSection.AUTHORITY,
                       netdebugger.DNSUtil.PacketSection.ADDITIONAL];

  parseSections.forEach(function(section) {
    for (var aI = 0; aI < sectionCount[section]; ++aI) {

      // See Section 3.2.1 in RFC 1035.
      var recName = this.parseName(this.lblPointManager_,
                                     this.dataDeserializer_);
      var recType = this.dataDeserializer_.getShort();
      var recClass = this.dataDeserializer_.getShort();
      var recTTL = this.dataDeserializer_.getLong();

      // obtain the length of the resource record data section
      // See RDLENGTH of Section 3.2.1 in RFC 1035.
      var dtSectLength = this.dataDeserializer_.getShort();
      var dtSectBinary = this.dataDeserializer_.slice(dtSectLength);

      // create the proper DNS record type
      switch (recType) {
        case netdebugger.DNSUtil.RecordNumber.A:
          var dnsRecord = new netdebugger.DNSRecordA(recName, recTTL);
          break;

        case netdebugger.DNSUtil.RecordNumber.MX:
          var dnsRecord = new netdebugger.DNSRecordMX(recName, recTTL);
          break;

        case netdebugger.DNSUtil.RecordNumber.AAAA:
          var dnsRecord = new netdebugger.DNSRecordAAAA(recName, recTTL);
          break;

        case netdebugger.DNSUtil.RecordNumber.TXT:
          var dnsRecord = new netdebugger.DNSRecordTXT(recName, recTTL);
          break;

        case DNSUtil.RecordNumber.CNAME:
          var dnsRecord = new netdebugger.DNSRecordCNAME(recName, recTTL);
          break;

        default:
          var dnsRecord = new netdebugger.DNSRecord(recName,
                                 recType,
                                 recClass,
                                 recTTL,
                                 dtSectBinary);
          break;
      }

      // set label point manager so individual record has access to entire
      // response packet to reassemble compressed DNS names
      dnsRecord.setLblPointManager(this.lblPointManager_);
      dnsRecord.setData(dtSectBinary);

      // parse data section of record and set it as part of the record
      // specifics of parsing data section depend in part on record type
      this.parseDataSection(recType, dtSectBinary, dnsRecord);

      // push the the record onto the DNS packet
      packet.push(section, dnsRecord);
    }
  }.bind(this));

  this.dataDeserializer_.isEOF() || console.warn('was not EOF on packet');
  this.deserializedPacket_ = packet;
};


/**
 * Parse the data section of a DNS packet, reassembling DNS names based upon
 *   DNS compression and parsing based upon various record types.
 * Set the parsed data section into the DNS record and set any associated
 *   fields.
 * @param {DNSUtil.RecordNumber} recordTypeNum DNS record type number.
 * @param {ArrayBuffer} dataSectionBinary Binary data of data section.
 * @param {DNSRecord} dnsRecord DNS packet to parse.
 */
netdebugger.DNSPacketDeserializer.prototype.parseDataSection = function(
                                                            recordTypeNum,
                                                            dataSectionBinary,
                                                            dnsRecord) {
  var dataSectionDeserializer = new netdebugger.Deserializer(dataSectionBinary);
  var dataSectionTxt = '';

  switch (recordTypeNum) {
    case netdebugger.DNSUtil.RecordNumber.A:
      var arrOctect = [];
      while (!dataSectionDeserializer.isEOF()) {
        arrOctect.push(dataSectionDeserializer.getByte());
      }
      dataSectionTxt = arrOctect.join('.');
      dnsRecord.setIp(dataSectionTxt);
      break;

    case netdebugger.DNSUtil.RecordNumber.AAAA:
      // take 16 byte data and parse into the 16 bytes of an IPv6 address
      var nibbleNum = 0;
      while (!dataSectionDeserializer.isEOF()) {
        var nextByte = dataSectionDeserializer.getByte();
        var nibbleADec = (nextByte & 0xf0) >> 4;
        var nibbleAHex = netdebugger.Util.baseConversion(nibbleADec, 16);
        nibbleNum++;

        var nibbleBDec = nextByte & 0x0f;
        var nibbleBHex = netdebugger.Util.baseConversion(nibbleBDec, 16);
        nibbleNum++;

        dataSectionTxt += nibbleAHex + nibbleBHex;
        if (nibbleNum % 4 == 0 && nibbleNum < 32) dataSectionTxt += ':';
        dnsRecord.setIp(dataSectionTxt);
      }
      break;

    case netdebugger.DNSUtil.RecordNumber.CNAME:
      dataSectionTxt += this.parseName(this.lblPointManager_,
                                       dataSectionDeserializer);
      dnsRecord.setCname(dataSectionTxt);
      break;

    case netdebugger.DNSUtil.RecordNumber.TXT:
      while (!dataSectionDeserializer.isEOF()) {
        var nextByte = dataSectionDeserializer.getByte();
        var nextChar = String.fromCharCode(nextByte);
        dataSectionTxt += nextChar;
      }
      dnsRecord.setText(dataSectionTxt);
      break;

     case netdebugger.DNSUtil.RecordNumber.MX:
       var preferenceNum = dataSectionDeserializer.getShort();
       var mailExchanger = this.parseName(this.lblPointManager_,
                                          dataSectionDeserializer);
       dnsRecord.setPreferenceNumber(preferenceNum);
       dnsRecord.setMailExchanger(mailExchanger);
       dataSectionTxt += 'Pref #: ' + preferenceNum;
       dataSectionTxt += '; Value: ' + mailExchanger;
       break;
  }
  dnsRecord.setData(dataSectionTxt);
};


/**
 * Parse a DNS name, which will either finish with a NULL byte or a suffix
 * reference (i.e., 0xc0 <ref>).
 * @param {ResponseLabelPointerManager} lblPtManager Reassemble compressed
 *                                                   DNS names.
 * @param {Deserializer} nameDeserializer Deserializer used to parse name.
 * @return {string} Parsed and re-assembled DNS name.
 */
netdebugger.DNSPacketDeserializer.prototype.parseName = function(lblPtManager,
                                                     nameDeserializer) {
  var parts = [];
  for (;;) {
    var len = nameDeserializer.getByte();

    // Examine the length bit to determine whether what is coming is
    // a label reference or a length of a name.
    if (!len) {
      // TODO: quitting
      break;
    } else if (len == 0xc0) {
      // TODO: It is technically only the high order two bits of the 16 bit
      // section that need to be ones... a label could be very large, so
      // checking against 0xc0 isn't 100% safe

      var ref = nameDeserializer.getByte();
      var nameSubstitution = lblPtManager.getNameFromReference(ref);
      parts.push(nameSubstitution);
      break;
    }

    // consume a DNS name
    var v = '';
    while (len-- > 0) {
      var nextByte = nameDeserializer.getByte();
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
netdebugger.DNSPacketDeserializer.prototype.getDeserializedPacket = function() {
  return this.deserializedPacket_;
};
