// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for Serializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.Serializer');

goog.require('goog.testing.jsunit');
goog.require('ndebug.Serializer');

goog.setTestOnly('Tests for ndebug.Serializer');


/**
 * Test method to add bytes for serialization.
 */
function testSetByte() {
  var mySerializer = new ndebug.Serializer();
  mySerializer.setByte(123);
  mySerializer.setByte(1);
  mySerializer.setByte(43);

  var myBuffer = mySerializer.getBuffer();
  assertEquals(3, myBuffer.byteLength);

  var myUnit8Array = new Uint8Array(myBuffer);
  assertEquals(123, myUnit8Array[0]);
  assertEquals(1, myUnit8Array[1]);
  assertEquals(43, myUnit8Array[2]);
}


/**
 * Test method to add shorts for serialization.
 */
function testSetShort() {
  var mySerializer = new ndebug.Serializer();
  mySerializer.setShort(294);
  mySerializer.setShort(510);
  mySerializer.setShort(411);

  var myBuffer = mySerializer.getBuffer();
  assertEquals(myBuffer.byteLength, 6);

  var myUnit8Array = new Uint8Array(myBuffer);
  assertEquals(38, myUnit8Array[1]);
  assertEquals(254, myUnit8Array[3]);
  assertEquals(155, myUnit8Array[5]);
}


/**
 * Test method to get array buffer.
 */
function testGetBuffer() {
  var mySerializer = new ndebug.Serializer();
  mySerializer.setByte(1);
  mySerializer.setByte(123);
  mySerializer.setByte(43);
  mySerializer.setByte(23);

  var myBuffer = mySerializer.getBuffer();
  assertEquals(4, myBuffer.byteLength);
}
