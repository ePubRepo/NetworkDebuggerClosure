// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Static utility class with enums and conversion functions.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSUtil');

/**
 * Static helper class for DNS information.
 */
netdebugger.DNSUtil = function() {};


/**
 * Enum for DNS record type.
 * @enum {number}
 */
netdebugger.DNSUtil.RecordNumber = {
  A: 1,
  AAAA: 28,
  MX: 15,
  CNAME: 5,
  TXT: 16
};


/**
 * Enum for section of the DNS packet (i.e., type of resource record).
 * @enum {string}
 */
netdebugger.DNSUtil.PacketSection = {
  QUESTION: 'qd',
  ANSWER: 'an',
  AUTHORITY: 'ns',
  ADDITIONAL: 'ar'
};


/**
 * @param {string} name Name of DNS record type.
 * @return {DNSUtil.RecordNumber} RFC 1035 DNS record number type.
 */
netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName = function(name) {
  switch (name.toUpperCase()) {
    case 'MX':
      return netdebugger.DNSUtil.RecordNumber.MX;
    case 'AAAA':
      return netdebugger.DNSUtil.RecordNumber.AAAA;
    case 'CNAME':
      return netdebugger.DNSUtil.RecordNumber.CNAME;
    case 'TXT':
      return netdebugger.DNSUtil.RecordNumber.TXT;
    default:
      return netdebugger.DNSUtil.RecordNumber.A;
  }
};


/**
 * Static function to return the DNS record type number.
 * @param {number} num DNS record type number.
 * @return {string} The DNS record type as a string.
 */
netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum = function(num) {
  switch (num) {
    case netdebugger.DNSUtil.RecordNumber.AAAA:
      return 'AAAA';

    case netdebugger.DNSUtil.RecordNumber.MX:
      return 'MX';

    case netdebugger.DNSUtil.RecordNumber.CNAME:
      return 'CNAME';

    case netdebugger.DNSUtil.RecordNumber.TXT:
      return 'TXT';
      
    case netdebugger.DNSUtil.RecordNumber.A:
    default:
      return 'A';
   }
};
