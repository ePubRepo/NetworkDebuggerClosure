// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for OutputRecordManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.OutputRecordManager');

goog.require('OutputRecord');
goog.require('OutputRecordManager');
goog.require('goog.testing.jsunit');


/**
 * Object to test OutputRecordManager class.
 */
test.OutputRecordManager = function() {};


/**
 * Test the getOutputRecords() method.
 */
function testGetOutputRecords() {
  var myRecordManager = new OutputRecordManager();
  myRecordManager.pushEntry(OutputRecord.DetailLevel.ERROR, 'test1');

  assertEquals('test1',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(OutputRecord.DetailLevel.ERROR,
      myRecordManager.getOutputRecords()[0].getLevel());

  var myRecordManager = new OutputRecordManager();
  myRecordManager.pushEntry(OutputRecord.DetailLevel.DEBUG, 'test2');

  assertEquals('test2',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(OutputRecord.DetailLevel.DEBUG,
      myRecordManager.getOutputRecords()[0].getLevel());
}
