// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for Deserializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.Deserializer');

goog.require('goog.testing.jsunit');
goog.require('ndebug.Deserializer');

goog.setTestOnly('Tests for ndebug.Deserializer');


/**
 * Setup an array of binary data for usage in testing.
 */
function setUp() {
  myUnit8Array = new Uint8Array(7);
  myUnit8Array[0] = 12;
  myUnit8Array[1] = 230;
  myUnit8Array[2] = 233;
  myUnit8Array[3] = 23;
  myUnit8Array[4] = 59;
  myUnit8Array[5] = 129;
  myUnit8Array[6] = 150;
}


/**
 * Test the ifEOF method.
 */
function testIsEOF() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  for (var i = 0; i < 7; i++) {
    assertFalse(myDeserializer.isEOF());
    myDeserializer.getByte();
  }
  assertTrue(myDeserializer.isEOF());
}


/**
 * Test the slide method.
 */
function testSlice() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  myDeserializer.getByte();
  var subArray = myDeserializer.slice(3);
  assertEquals(230, subArray[0]);
  assertEquals(233, subArray[1]);
  assertEquals(23, subArray[2]);
}


/**
 * Test the byte method.
 */
function testGetByte() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  assertEquals(12, myDeserializer.getByte());
  assertEquals(230, myDeserializer.getByte());
  assertEquals(233, myDeserializer.getByte());
  assertEquals(23, myDeserializer.getByte());
  assertEquals(59, myDeserializer.getByte());
  assertEquals(129, myDeserializer.getByte());
  assertEquals(150, myDeserializer.getByte());
}


/**
 * Test method to get next short.
 */
function testGetShort() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  assertEquals(3302, myDeserializer.getShort());
  assertEquals(59671, myDeserializer.getShort());
}


/**
 * Test the method to get the next long.
 */
function testGetLong() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  assertEquals(216459543, myDeserializer.getLong());
}


/**
 * Test the method to get the number of bytes read.
 */
function testGetBytesRead() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  assertEquals(0, myDeserializer.getBytesRead());
  myDeserializer.getByte();
  assertEquals(1, myDeserializer.getBytesRead());
  myDeserializer.getByte();
  assertEquals(2, myDeserializer.getBytesRead());
  myDeserializer.getByte();
  assertEquals(3, myDeserializer.getBytesRead());
  myDeserializer.getByte();
  assertEquals(4, myDeserializer.getBytesRead());
  myDeserializer.getByte();
  assertEquals(5, myDeserializer.getBytesRead());
}


/**
 * Test the method to get the total bytes.
 */
function testGetTotalBytes() {
  var myDeserializer = new ndebug.Deserializer(myUnit8Array);
  assertEquals(7, myDeserializer.getTotalBytes());
}
