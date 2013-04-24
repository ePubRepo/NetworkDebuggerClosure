// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacket class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSPacket');

goog.require('DNSPacket');
goog.require('DNSRecordMX');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for DNSPacket');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsPacket1 = new DNSPacket();
  myDnsRecordMX1 = new DNSRecordMX('t1.com', 555);
  myDnsRecordMX1.setPreferenceNumber(10);
  myDnsRecordMX1.setMailExchanger('aspmx.l.google.com');
  myDnsPacket1.push(DNSUtil.PacketSection.ANSWER, myDnsRecordMX1);


  myDnsPacket2 = new DNSPacket();
  myDnsRecordMX2 = new DNSRecordMX('t2.com', 550);
  myDnsRecordMX2.setPreferenceNumber(20);
  myDnsRecordMX2.setMailExchanger('alt2.aspmx.l.google.com');
  myDnsPacket2.push(DNSUtil.PacketSection.ANSWER, myDnsRecordMX2);
  myDnsRecordMX3 = new DNSRecordMX('t3.com', 500);
  myDnsRecordMX3.setPreferenceNumber(30);
  myDnsRecordMX3.setMailExchanger('alt3.aspmx.l.google.com');
  myDnsPacket2.push(DNSUtil.PacketSection.ANSWER, myDnsRecordMX3);
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
  var myDnsPacket3 = new DNSPacket(myFlags);
  assertEquals(myFlags, myDnsPacket3.getFlags());
}
