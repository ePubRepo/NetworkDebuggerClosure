// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacketSerializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSPacketSerializer');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSPacket');
goog.require('ndebug.DNSPacketSerializer');
goog.require('ndebug.DNSRecord');
goog.require('ndebug.DNSUtil');

goog.setTestOnly('Tests for ndebug.DNSPacketSerializer');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsPacket = new ndebug.DNSPacket(0x100);
  myDnsPacket.push(ndebug.DNSUtil.PacketSection.QUESTION,
                   new ndebug.DNSRecord('google.com',
                       ndebug.DNSUtil.RecordNumber.A,
                                 1));
}


/**
 * Test the testSerializePacket() method.
 */
function testSerializePacket() {
  var serializer = new ndebug.DNSPacketSerializer(myDnsPacket);
  var serializedQueryPacket = serializer.serialize();
  var queryAsArrayBuffer = new Uint8Array(serializedQueryPacket);

  assertEquals(28, serializedQueryPacket.byteLength);
  assertEquals(0, queryAsArrayBuffer[0]);
  assertEquals(0, queryAsArrayBuffer[1]);
  assertEquals(103, queryAsArrayBuffer[13]);
  assertEquals(109, queryAsArrayBuffer[22]);
}
