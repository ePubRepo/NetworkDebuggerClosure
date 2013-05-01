// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSQueryManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSQueryManager');

goog.require('netdebugger.DNSQueryManager');
goog.require('netdebugger.DNSUtil');
goog.require('netdebugger.OutputRecordManager');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for DNSQueryManager');


/**
 * Create objects for testing.
 */
function setUp() {
  function callback() {}
  myOutputRecordManager = new netdebugger.OutputRecordManager();
  myQueryManager1 = new netdebugger.DNSQueryManager('google.com',
      netdebugger.DNSUtil.RecordNumber.A, '8.8.8.8', callback, myOutputRecordManager);
}


/**
 * Test the setRecursionDesired() method.
 */
function testSetRecursionDesired() {
  assertEquals(0x100, myQueryManager1.getFormattedHeader_());
  myQueryManager1.setRecursionDesired();
  assertEquals(0, myQueryManager1.getFormattedHeader_());
}


/**
 * Test the getOutputRecordManager() method.
 */
function testGetOutputRecordManager() {
  assertObjectEquals(myOutputRecordManager,
      myQueryManager1.getOutputRecordManager());
}
