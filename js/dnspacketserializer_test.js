// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacketSerializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSPacketSerializer');

goog.require('netdebugger.DNSPacket');
goog.require('netdebugger.DNSPacketSerializer');
goog.require('netdebugger.DNSRecord');
goog.require('netdebugger.DNSUtil');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for netdebugger.DNSPacketSerializer');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsPacket = new netdebugger.DNSPacket(0x100);
  myDnsPacket.push(netdebugger.DNSUtil.PacketSection.QUESTION,
                   new netdebugger.DNSRecord('google.com',
                       netdebugger.DNSUtil.RecordNumber.A,
                                 1));
}


/**
 * Test the testSerializePacket() method.
 */
function testSerializePacket() {
  var serializer = new netdebugger.DNSPacketSerializer(myDnsPacket);
  var serializedQueryPacket = serializer.serialize();
  var queryAsArrayBuffer = new Uint8Array(serializedQueryPacket);

  assertEquals(28, serializedQueryPacket.byteLength);
  assertEquals(0, queryAsArrayBuffer[0]);
  assertEquals(0, queryAsArrayBuffer[1]);
  assertEquals(103, queryAsArrayBuffer[13]);
  assertEquals(109, queryAsArrayBuffer[22]);
}
