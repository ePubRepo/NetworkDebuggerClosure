// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSInputHelper class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSInputHelper');

goog.require('DNSInputHelper');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');
goog.require('TestHelper');


/**
 * Object to test DNSPacketSerializer class.
 */
test.DNSPacketSerializer = function() {};


/**
 * Create objects for testing.
 */
function setUp() {
  var myTestHelper = new TestHelper();
  myTestHelper.setupDom();
}


/**
 * Test the testSerializePacket() method.
 */
function testIsValidHostnameEntered() {
  var inputHelper = new DNSInputHelper();
  assertTrue(inputHelper.isValidHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail';
  assertFalse(inputHelper.isValidHostnameEntered());
}


/**
 * Test the getHostnameEntered() method.
 */
function testGetHostnameEntered() {
  var inputHelper = new DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getCustomResolverIp() method.
 */
function testGetCustomResolverIp() {
  var inputHelper = new DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getRecordType() method.
 */
function testGetRecordType() {
  var inputHelper = new DNSInputHelper();
  assertEquals(DNSUtil.RecordNumber.A, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 1;
  assertEquals(DNSUtil.RecordNumber.AAAA, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 2;
  assertEquals(DNSUtil.RecordNumber.MX, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 3;
  assertEquals(DNSUtil.RecordNumber.TXT, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 4;
  assertEquals(DNSUtil.RecordNumber.CNAME, inputHelper.getRecordType());
}
