// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecordMX class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSRecordMX');

goog.require('DNSRecordMX');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');


/**
 * Object to test DNSRecordMX class.
 */
test.DNSRecordMX = function() {};


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordMX1 = new DNSRecordMX('t1.com', 555);
  myDnsRecordMX1.setPreferenceNumber(10);
  myDnsRecordMX1.setMailExchanger('aspmx.l.google.com');
  myDnsRecordMX2 = new DNSRecordMX('t2.com', 550);
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
  assertEquals(DNSUtil.RecordNumber.MX, myDnsRecordMX1.getType());
  assertEquals(DNSUtil.RecordNumber.MX, myDnsRecordMX2.getType());
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
