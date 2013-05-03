// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacket class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSPacket');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSPacket');
goog.require('ndebug.DNSRecordMX');
goog.require('ndebug.DNSUtil');

goog.setTestOnly('Tests for ndebug.DNSPacket');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsPacket1 = new ndebug.DNSPacket();
  myDnsRecordMX1 = new ndebug.DNSRecordMX('t1.com', 555);
  myDnsRecordMX1.setPreferenceNumber(10);
  myDnsRecordMX1.setMailExchanger('aspmx.l.google.com');
  myDnsPacket1.push(ndebug.DNSUtil.PacketSection.ANSWER, myDnsRecordMX1);


  myDnsPacket2 = new ndebug.DNSPacket();
  myDnsRecordMX2 = new ndebug.DNSRecordMX('t2.com', 550);
  myDnsRecordMX2.setPreferenceNumber(20);
  myDnsRecordMX2.setMailExchanger('alt2.aspmx.l.google.com');
  myDnsPacket2.push(ndebug.DNSUtil.PacketSection.ANSWER, myDnsRecordMX2);
  myDnsRecordMX3 = new ndebug.DNSRecordMX('t3.com', 500);
  myDnsRecordMX3.setPreferenceNumber(30);
  myDnsRecordMX3.setMailExchanger('alt3.aspmx.l.google.com');
  myDnsPacket2.push(ndebug.DNSUtil.PacketSection.ANSWER, myDnsRecordMX3);
}


/**
 * Test the getAnswerRecordCount() method.
 */
function testGetAnswerRecordCount() {
  assertEquals(1, myDnsPacket1.getAnswerRecordCount());
  assertEquals(2, myDnsPacket2.getAnswerRecordCount());
}


/**
 * Test the getFlags() method.
 */
function testGetFlags() {
  var myFlags = 0x100;
  var myDnsPacket3 = new ndebug.DNSPacket(myFlags);
  assertEquals(myFlags, myDnsPacket3.getFlags());
}
