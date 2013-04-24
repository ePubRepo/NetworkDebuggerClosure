// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSUtil class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSUtil');

goog.require('DNSUtil');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for DNSUtil');


/**
 * Test for getRecordTypeNumByRecordTypeName() method.
 */
function testGetRecordTypeNumByRecordTypeName() {
  assertEquals(DNSUtil.RecordNumber.MX,
      DNSUtil.getRecordTypeNumByRecordTypeName('MX'));
  assertEquals(DNSUtil.RecordNumber.A,
      DNSUtil.getRecordTypeNumByRecordTypeName('A'));
  assertEquals(DNSUtil.RecordNumber.AAAA,
      DNSUtil.getRecordTypeNumByRecordTypeName('AAAA'));
  assertEquals(DNSUtil.RecordNumber.CNAME,
      DNSUtil.getRecordTypeNumByRecordTypeName('CNAME'));
  assertEquals(DNSUtil.RecordNumber.TXT,
      DNSUtil.getRecordTypeNumByRecordTypeName('TXT'));
}


/**
 * Test for getRecordTypeNameByRecordTypeNum() method.
 */
function testGetRecordTypeNameByRecordTypeNum() {
  assertEquals('MX',
      DNSUtil.getRecordTypeNameByRecordTypeNum(DNSUtil.RecordNumber.MX));
  assertEquals('A',
      DNSUtil.getRecordTypeNameByRecordTypeNum(DNSUtil.RecordNumber.A));
  assertEquals('AAAA',
      DNSUtil.getRecordTypeNameByRecordTypeNum(DNSUtil.RecordNumber.AAAA));
  assertEquals('MX',
      DNSUtil.getRecordTypeNameByRecordTypeNum(DNSUtil.RecordNumber.MX));
  assertEquals('TXT',
      DNSUtil.getRecordTypeNameByRecordTypeNum(DNSUtil.RecordNumber.TXT));
  assertEquals('CNAME',
      DNSUtil.getRecordTypeNameByRecordTypeNum(DNSUtil.RecordNumber.CNAME));
}
