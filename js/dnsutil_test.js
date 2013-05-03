// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSUtil class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSUtil');

goog.require('goog.testing.jsunit');
goog.require('netdebugger.DNSUtil');

goog.setTestOnly('Tests for netdebugger.DNSUtil');


/**
 * Test for getRecordTypeNumByRecordTypeName() method.
 */
function testGetRecordTypeNumByRecordTypeName() {
  assertEquals(netdebugger.DNSUtil.RecordNumber.MX,
      netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName('MX'));
  assertEquals(netdebugger.DNSUtil.RecordNumber.A,
      netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName('A'));
  assertEquals(netdebugger.DNSUtil.RecordNumber.AAAA,
      netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName('AAAA'));
  assertEquals(netdebugger.DNSUtil.RecordNumber.CNAME,
      netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName('CNAME'));
  assertEquals(netdebugger.DNSUtil.RecordNumber.TXT,
      netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName('TXT'));
}


/**
 * Test for getRecordTypeNameByRecordTypeNum() method.
 */
function testGetRecordTypeNameByRecordTypeNum() {
  assertEquals('MX',
      netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum(
          netdebugger.DNSUtil.RecordNumber.MX));
  assertEquals('A',
      netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum(
          netdebugger.DNSUtil.RecordNumber.A));
  assertEquals('AAAA',
      netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum(
          netdebugger.DNSUtil.RecordNumber.AAAA));
  assertEquals('MX',
      netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum(
          netdebugger.DNSUtil.RecordNumber.MX));
  assertEquals('TXT',
      netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum(
          netdebugger.DNSUtil.RecordNumber.TXT));
  assertEquals('CNAME',
      netdebugger.DNSUtil.getRecordTypeNameByRecordTypeNum(
          netdebugger.DNSUtil.RecordNumber.CNAME));
}
