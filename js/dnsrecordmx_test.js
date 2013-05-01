// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecordMX class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSRecordMX');

goog.require('netdebugger.DNSRecordMX');
goog.require('netdebugger.DNSUtil');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for netdebugger.DNSRecordMX');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordMX1 = new netdebugger.DNSRecordMX('t1.com', 555);
  myDnsRecordMX1.setPreferenceNumber(10);
  myDnsRecordMX1.setMailExchanger('aspmx.l.google.com');
  myDnsRecordMX2 = new netdebugger.DNSRecordMX('t2.com', 550);
  myDnsRecordMX2.setPreferenceNumber(20);
  myDnsRecordMX2.setMailExchanger('alt2.aspmx.l.google.com');
}


/**
 * Test the getName() method.
 */
function testGetName() {
  assertEquals('t1.com', myDnsRecordMX1.getName());
  assertEquals('t2.com', myDnsRecordMX2.getName());
}


/**
 * Test the getType() method.
 */
function testGetType() {
  assertEquals(netdebugger.DNSUtil.RecordNumber.MX, myDnsRecordMX1.getType());
  assertEquals(netdebugger.DNSUtil.RecordNumber.MX, myDnsRecordMX2.getType());
}


/**
 * Test the getTTL() method.
 */
function testTtl() {
  assertEquals(555, myDnsRecordMX1.getTTL());
  assertEquals(550, myDnsRecordMX2.getTTL());
}


/**
 * Test the getMailExchanger() method.
 */
function testGetMailExchanger() {
  assertEquals('aspmx.l.google.com', myDnsRecordMX1.getMailExchanger());
  assertEquals('alt2.aspmx.l.google.com', myDnsRecordMX2.getMailExchanger());
}


/**
 * Test the getPreferenceNumber() method.
 */
function testGetPreferenceNumber() {
  assertEquals(10, myDnsRecordMX1.getPreferenceNumber());
  assertEquals(20, myDnsRecordMX2.getPreferenceNumber());
}
