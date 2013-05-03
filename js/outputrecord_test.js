// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for OutputRecord class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.OutputRecord');

goog.require('goog.testing.jsunit');
goog.require('ndebug.OutputRecord');

goog.setTestOnly('Tests for OutputRecord');


/**
 * Create objects for testing.
 */
function setUp() {
  outputRecord1 = new ndebug.OutputRecord(
      ndebug.OutputRecord.DetailLevel.ERROR, 'Message1');
  outputRecord2 = new ndebug.OutputRecord(
      ndebug.OutputRecord.DetailLevel.WARNING, 'Message2');
  outputRecord3 = new ndebug.OutputRecord(
      ndebug.OutputRecord.DetailLevel.INFO, 'Message3');
  outputRecord4 = new ndebug.OutputRecord(
      ndebug.OutputRecord.DetailLevel.DEBUG, 'Message4');
  outputRecord5 = new ndebug.OutputRecord(
      ndebug.OutputRecord.DetailLevel.TRACE, 'Message5');
}


/**
 * Test the getTimestamp() thread.
 */
function testGetTimestamp() {
  var time1a = (new Date()).getTime().toString();
  var time1b = outputRecord1.getTimestamp().toString();
  assertEquals(time1a.substring(0, 8), time1b.substring(0, 8));

  var time2a = (new Date()).getTime().toString();
  var time2b = outputRecord2.getTimestamp().toString();
  assertEquals(time2a.substring(0, 8), time2b.substring(0, 8));
}


/**
 * Test the getLevel() thread.
 */
function testGetLevel() {
  assertEquals(ndebug.OutputRecord.DetailLevel.ERROR,
      outputRecord1.getLevel());
  assertEquals(ndebug.OutputRecord.DetailLevel.WARNING,
      outputRecord2.getLevel());
  assertEquals(ndebug.OutputRecord.DetailLevel.INFO,
      outputRecord3.getLevel());
  assertEquals(ndebug.OutputRecord.DetailLevel.DEBUG,
      outputRecord4.getLevel());
  assertEquals(ndebug.OutputRecord.DetailLevel.TRACE,
      outputRecord5.getLevel());
}


/**
 * Test the getMessage() thread.
 */
function testGetMessage() {
  assertEquals('Message1', outputRecord1.getMessage());
  assertEquals('Message2', outputRecord2.getMessage());
  assertEquals('Message3', outputRecord3.getMessage());
  assertEquals('Message4', outputRecord4.getMessage());
  assertEquals('Message5', outputRecord5.getMessage());
}
