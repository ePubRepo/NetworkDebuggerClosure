// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for OutputRecorderManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.OutputRecorderManager');

goog.require('OutputRecord');
goog.require('OutputRecorderManager');
goog.require('goog.testing.jsunit');


/**
 * Object to test OutputRecorderManager class.
 */
test.OutputRecorderManager = function() {};


/**
 * Test the getOutputRecords() method.
 */
function testGetOutputRecords() {
  var myRecordManager = new OutputRecorderManager();
  myRecordManager.pushEntry(OutputRecord.DetailLevel.ERROR, 'test1');

  assertEquals('test1',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(OutputRecord.DetailLevel.ERROR,
      myRecordManager.getOutputRecords()[0].getLevel());

  var myRecordManager = new OutputRecorderManager();
  myRecordManager.pushEntry(OutputRecord.DetailLevel.DEBUG, 'test2');

  assertEquals('test2',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(OutputRecord.DetailLevel.DEBUG,
      myRecordManager.getOutputRecords()[0].getLevel());
}
