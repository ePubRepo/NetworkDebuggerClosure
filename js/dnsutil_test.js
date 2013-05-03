// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSUtil class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSUtil');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSUtil');

goog.setTestOnly('Tests for ndebug.DNSUtil');


/**
 * Test for getRecordTypeNumByRecordTypeName() method.
 */
function testGetRecordTypeNumByRecordTypeName() {
  assertEquals(ndebug.DNSUtil.RecordNumber.MX,
      ndebug.DNSUtil.getRecordTypeNumByRecordTypeName('MX'));
  assertEquals(ndebug.DNSUtil.RecordNumber.A,
      ndebug.DNSUtil.getRecordTypeNumByRecordTypeName('A'));
  assertEquals(ndebug.DNSUtil.RecordNumber.AAAA,
      ndebug.DNSUtil.getRecordTypeNumByRecordTypeName('AAAA'));
  assertEquals(ndebug.DNSUtil.RecordNumber.CNAME,
      ndebug.DNSUtil.getRecordTypeNumByRecordTypeName('CNAME'));
  assertEquals(ndebug.DNSUtil.RecordNumber.TXT,
      ndebug.DNSUtil.getRecordTypeNumByRecordTypeName('TXT'));
}


/**
 * Test for getRecordTypeNameByRecordTypeNum() method.
 */
function testGetRecordTypeNameByRecordTypeNum() {
  assertEquals('MX',
      ndebug.DNSUtil.getRecordTypeNameByRecordTypeNum(
          ndebug.DNSUtil.RecordNumber.MX));
  assertEquals('A',
      ndebug.DNSUtil.getRecordTypeNameByRecordTypeNum(
          ndebug.DNSUtil.RecordNumber.A));
  assertEquals('AAAA',
      ndebug.DNSUtil.getRecordTypeNameByRecordTypeNum(
          ndebug.DNSUtil.RecordNumber.AAAA));
  assertEquals('MX',
      ndebug.DNSUtil.getRecordTypeNameByRecordTypeNum(
          ndebug.DNSUtil.RecordNumber.MX));
  assertEquals('TXT',
      ndebug.DNSUtil.getRecordTypeNameByRecordTypeNum(
          ndebug.DNSUtil.RecordNumber.TXT));
  assertEquals('CNAME',
      ndebug.DNSUtil.getRecordTypeNameByRecordTypeNum(
          ndebug.DNSUtil.RecordNumber.CNAME));
}
