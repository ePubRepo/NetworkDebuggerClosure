// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for OutputRecordManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.OutputRecordManager');

goog.require('netdebugger.OutputRecord');
goog.require('netdebugger.OutputRecordManager');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for OutputRecordManager');


/**
 * Test the getOutputRecords() method.
 */
function testGetOutputRecords() {
  var myRecordManager = new netdebugger.OutputRecordManager();
  myRecordManager.pushEntry(netdebugger.OutputRecord.DetailLevel.ERROR, 'test1');

  assertEquals('test1',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(netdebugger.OutputRecord.DetailLevel.ERROR,
      myRecordManager.getOutputRecords()[0].getLevel());

  var myRecordManager = new netdebugger.OutputRecordManager();
  myRecordManager.pushEntry(netdebugger.OutputRecord.DetailLevel.DEBUG, 'test2');

  assertEquals('test2',
      myRecordManager.getOutputRecords()[0].getMessage());
  assertEquals(netdebugger.OutputRecord.DetailLevel.DEBUG,
      myRecordManager.getOutputRecords()[0].getLevel());
}
