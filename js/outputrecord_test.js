// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for OutputRecord class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.OutputRecord');

goog.require('netdebugger.OutputRecord');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for OutputRecord');


/**
 * Create objects for testing.
 */
function setUp() {
  outputRecord1 = new netdebugger.OutputRecord(
      netdebugger.OutputRecord.DetailLevel.ERROR, 'Message1');
  outputRecord2 = new netdebugger.OutputRecord(
      netdebugger.OutputRecord.DetailLevel.WARNING, 'Message2');
  outputRecord3 = new netdebugger.OutputRecord(
      netdebugger.OutputRecord.DetailLevel.INFO, 'Message3');
  outputRecord4 = new netdebugger.OutputRecord(
      netdebugger.OutputRecord.DetailLevel.DEBUG, 'Message4');
  outputRecord5 = new netdebugger.OutputRecord(
      netdebugger.OutputRecord.DetailLevel.TRACE, 'Message5');
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
  assertEquals(netdebugger.OutputRecord.DetailLevel.ERROR,
      outputRecord1.getLevel());
  assertEquals(netdebugger.OutputRecord.DetailLevel.WARNING,
      outputRecord2.getLevel());
  assertEquals(netdebugger.OutputRecord.DetailLevel.INFO,
      outputRecord3.getLevel());
  assertEquals(netdebugger.OutputRecord.DetailLevel.DEBUG,
      outputRecord4.getLevel());
  assertEquals(netdebugger.OutputRecord.DetailLevel.TRACE,
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
