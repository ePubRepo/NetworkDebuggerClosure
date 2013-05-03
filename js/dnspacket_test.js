// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacket class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSPacket');

goog.require('goog.testing.jsunit');
goog.require('netdebugger.DNSPacket');
goog.require('netdebugger.DNSRecordMX');
goog.require('netdebugger.DNSUtil');

goog.setTestOnly('Tests for netdebugger.DNSPacket');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsPacket1 = new netdebugger.DNSPacket();
  myDnsRecordMX1 = new netdebugger.DNSRecordMX('t1.com', 555);
  myDnsRecordMX1.setPreferenceNumber(10);
  myDnsRecordMX1.setMailExchanger('aspmx.l.google.com');
  myDnsPacket1.push(netdebugger.DNSUtil.PacketSection.ANSWER, myDnsRecordMX1);


  myDnsPacket2 = new netdebugger.DNSPacket();
  myDnsRecordMX2 = new netdebugger.DNSRecordMX('t2.com', 550);
  myDnsRecordMX2.setPreferenceNumber(20);
  myDnsRecordMX2.setMailExchanger('alt2.aspmx.l.google.com');
  myDnsPacket2.push(netdebugger.DNSUtil.PacketSection.ANSWER, myDnsRecordMX2);
  myDnsRecordMX3 = new netdebugger.DNSRecordMX('t3.com', 500);
  myDnsRecordMX3.setPreferenceNumber(30);
  myDnsRecordMX3.setMailExchanger('alt3.aspmx.l.google.com');
  myDnsPacket2.push(netdebugger.DNSUtil.PacketSection.ANSWER, myDnsRecordMX3);
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
  var myDnsPacket3 = new netdebugger.DNSPacket(myFlags);
  assertEquals(myFlags, myDnsPacket3.getFlags());
}
