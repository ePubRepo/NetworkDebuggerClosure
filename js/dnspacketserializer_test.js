// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacketSerializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSPacketSerializer');

goog.require('DNSPacket');
goog.require('DNSPacketSerializer');
goog.require('DNSRecord');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for DNSPacketSerializer');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsPacket = new DNSPacket(0x100);
  myDnsPacket.push(DNSUtil.PacketSection.QUESTION,
                   new DNSRecord('google.com',
                                 DNSUtil.RecordNumber.A,
                                 1));
}


/**
 * Test the testSerializePacket() method.
 */
function testSerializePacket() {
  var serializer = new DNSPacketSerializer(myDnsPacket);
  var serializedQueryPacket = serializer.serialize();
  var queryAsArrayBuffer = new Uint8Array(serializedQueryPacket);
  console.log(queryAsArrayBuffer);
  assertEquals(28, serializedQueryPacket.byteLength);
  assertEquals(0, queryAsArrayBuffer[0]);
  assertEquals(0, queryAsArrayBuffer[1]);
  assertEquals(103, queryAsArrayBuffer[13]);
  assertEquals(109, queryAsArrayBuffer[22]);
}
