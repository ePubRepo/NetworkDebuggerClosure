// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Capture and store output from tests.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.OutputRecordManager');

goog.require('netdebugger.OutputRecord');

/**
 * Receive output messages from one test and record it along with an associated
 * timestamp. Each test should have its own instance of an OutputRecordManager.
 *
 * @constructor
 */
netdebugger.OutputRecordManager = function() {
  this.outputEntries_ = new Array();
};


/**
 * Store instances of OutputRecord.
 * @type Array.<netdebugger.OutputRecord>
 * @private
 */
netdebugger.OutputRecordManager.prototype.outputEntries_ = null;


/**
 * Push a message to the record.
 * @param {netdebugger.OutputRecord.DetailLevel} level Level of log information.
 * @param {string} msg Message to be recorded.
 */
netdebugger.OutputRecordManager.prototype.pushEntry = function(level, msg) {
  var record = new netdebugger.OutputRecord(level, msg);
  this.outputEntries_.push(record);
};


/**
 * Return set of output entries.
 * @return {Array.<netdebugger.OutputRecord>} Set of output entries with log records.
 */
netdebugger.OutputRecordManager.prototype.getOutputRecords = function() {
  return this.outputEntries_;
};
