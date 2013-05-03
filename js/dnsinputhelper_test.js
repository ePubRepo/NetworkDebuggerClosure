// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSInputHelper class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSInputHelper');

goog.require('goog.testing.jsunit');
goog.require('netdebugger.DNSInputHelper');
goog.require('netdebugger.DNSUtil');
goog.require('netdebugger.TestHelper');

goog.setTestOnly('Tests for netdebugger.DNSInputHelper');


/**
 * Create objects for testing.
 */
function setUp() {
  var myTestHelper = new netdebugger.TestHelper();
  myTestHelper.setupDom();
}


/**
 * Test the testSerializePacket() method.
 */
function testIsValidHostnameEntered() {
  var inputHelper = new netdebugger.DNSInputHelper();
  assertTrue(inputHelper.isValidHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail';
  assertFalse(inputHelper.isValidHostnameEntered());
}


/**
 * Test the getHostnameEntered() method.
 */
function testGetHostnameEntered() {
  var inputHelper = new netdebugger.DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getCustomResolverIp() method.
 */
function testGetCustomResolverIp() {
  var inputHelper = new netdebugger.DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getRecordType() method.
 */
function testGetRecordType() {
  var inputHelper = new netdebugger.DNSInputHelper();
  assertEquals(netdebugger.DNSUtil.RecordNumber.A, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 1;
  assertEquals(netdebugger.DNSUtil.RecordNumber.AAAA, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 2;
  assertEquals(netdebugger.DNSUtil.RecordNumber.MX, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 3;
  assertEquals(netdebugger.DNSUtil.RecordNumber.TXT, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 4;
  assertEquals(netdebugger.DNSUtil.RecordNumber.CNAME, inputHelper.getRecordType());
}
