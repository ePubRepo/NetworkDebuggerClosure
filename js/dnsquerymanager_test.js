// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSQueryManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSQueryManager');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSQueryManager');
goog.require('ndebug.DNSUtil');
goog.require('ndebug.OutputRecordManager');

goog.setTestOnly('Tests for DNSQueryManager');


/**
 * Create objects for testing.
 */
function setUp() {
  function callback() {}
  myOutputRecordManager = new ndebug.OutputRecordManager();
  myQueryManager1 = new ndebug.DNSQueryManager('google.com',
      ndebug.DNSUtil.RecordNumber.A,
      '8.8.8.8',
      callback,
      myOutputRecordManager);
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
