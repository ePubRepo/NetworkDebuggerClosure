// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for Serializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.Serializer');

goog.require('Serializer');
goog.require('goog.testing.jsunit');

/**
 * Test Serializer object.
 * @constructor
 */
test.Serializer = function() {};


/**
 * Test method to add bytes for serialization.
 */
function testByte() {
  var mySerializer = new Serializer();
  mySerializer.byte(123);
  mySerializer.byte(1);
  mySerializer.byte(43);

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
function testShort() {
  var mySerializer = new Serializer();
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
  var mySerializer = new Serializer();
  mySerializer.byte(1);
  mySerializer.byte(123);
  mySerializer.byte(43);
  mySerializer.byte(23);

  var myBuffer = mySerializer.getBuffer();
  assertEquals(4, myBuffer.byteLength);
}
