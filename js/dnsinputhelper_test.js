// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSInputHelper class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSInputHelper');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSInputHelper');
goog.require('ndebug.DNSUtil');
goog.require('ndebug.TestHelper');

goog.setTestOnly('Tests for ndebug.DNSInputHelper');


/**
 * Create objects for testing.
 */
function setUp() {
  var myTestHelper = new ndebug.TestHelper();
  myTestHelper.setupDom();
}


/**
 * Test the testSerializePacket() method.
 */
function testIsValidHostnameEntered() {
  var inputHelper = new ndebug.DNSInputHelper();
  assertTrue(inputHelper.isValidHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail';
  assertFalse(inputHelper.isValidHostnameEntered());
}


/**
 * Test the getHostnameEntered() method.
 */
function testGetHostnameEntered() {
  var inputHelper = new ndebug.DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getCustomResolverIp() method.
 */
function testGetCustomResolverIp() {
  var inputHelper = new ndebug.DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getRecordType() method.
 */
function testGetRecordType() {
  var inputHelper = new ndebug.DNSInputHelper();
  assertEquals(ndebug.DNSUtil.RecordNumber.A, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 1;
  assertEquals(ndebug.DNSUtil.RecordNumber.AAAA, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 2;
  assertEquals(ndebug.DNSUtil.RecordNumber.MX, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 3;
  assertEquals(ndebug.DNSUtil.RecordNumber.TXT, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 4;
  assertEquals(ndebug.DNSUtil.RecordNumber.CNAME, inputHelper.getRecordType());
}
