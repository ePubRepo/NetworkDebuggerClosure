// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for Utility class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.Deserializer');

goog.require('Deserializer');
goog.require('goog.testing.jsunit');


/**
 * Object to test Deserializer class.
 */
test.Deserializer = function() {};


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
  var myDeserializer = new Deserializer(myUnit8Array);
  for (var i = 0; i < 7; i++) {
    assertFalse(myDeserializer.isEOF_());
    myDeserializer.byte_();
  }
  assertTrue(myDeserializer.isEOF_());
}


/**
 * Test the slide method.
 */
function testSlice() {
  var myDeserializer = new Deserializer(myUnit8Array);
  myDeserializer.byte_();
  var subArray = myDeserializer.slice(3);
  assertEquals(230, subArray[0]);
  assertEquals(233, subArray[1]);
  assertEquals(23, subArray[2]);
}


/**
 * Test the byte method.
 */
function testByte() {
  var myDeserializer = new Deserializer(myUnit8Array);
  assertEquals(12, myDeserializer.byte_());
  assertEquals(230, myDeserializer.byte_());
  assertEquals(233, myDeserializer.byte_());
  assertEquals(23, myDeserializer.byte_());
  assertEquals(59, myDeserializer.byte_());
  assertEquals(129, myDeserializer.byte_());
  assertEquals(150, myDeserializer.byte_());
}


/**
 * Test method to get next short.
 */
function testShort() {
  var myDeserializer = new Deserializer(myUnit8Array);
  assertEquals(3302, myDeserializer.short());
  assertEquals(59671, myDeserializer.short());
}


/**
 * Test the method to get the next long.
 */
function testGetLong() {
  var myDeserializer = new Deserializer(myUnit8Array);
  assertEquals(216459543, myDeserializer.getLong());
}


/**
 * Test the method to get the number of bytes read.
 */
function testGetBytesRead() {
  var myDeserializer = new Deserializer(myUnit8Array);
  assertEquals(0, myDeserializer.getBytesRead());
  myDeserializer.byte_();
  assertEquals(1, myDeserializer.getBytesRead());
  myDeserializer.byte_();
  assertEquals(2, myDeserializer.getBytesRead());
  myDeserializer.byte_();
  assertEquals(3, myDeserializer.getBytesRead());
  myDeserializer.byte_();
  assertEquals(4, myDeserializer.getBytesRead());
  myDeserializer.byte_();
  assertEquals(5, myDeserializer.getBytesRead());
}


/**
 * Test the method to get the total bytes.
 */
function testGetTotalBytes() {
  var myDeserializer = new Deserializer(myUnit8Array);
  assertEquals(7, myDeserializer.getTotalBytes());
}
