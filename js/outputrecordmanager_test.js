// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for OutputRecordManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.OutputRecordManager');

goog.require('goog.testing.jsunit');
goog.require('ndebug.OutputRecord');
goog.require('ndebug.OutputRecordManager');

goog.setTestOnly('Tests for OutputRecordManager');


/**
 * Test the getOutputRecords() method.
 */
function testGetOutputRecords() {
  var myRecordManager = new ndebug.OutputRecordManager();
  myRecordManager.pushEntry(ndebug.OutputRecord.DetailLevel.ERROR, 'test1');

  assertEquals('test1',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(ndebug.OutputRecord.DetailLevel.ERROR,
      myRecordManager.getOutputRecords()[0].getLevel());

  var myRecordManager = new ndebug.OutputRecordManager();
  myRecordManager.pushEntry(ndebug.OutputRecord.DetailLevel.DEBUG, 'test2');

  assertEquals('test2',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(ndebug.OutputRecord.DetailLevel.DEBUG,
      myRecordManager.getOutputRecords()[0].getLevel());
}
