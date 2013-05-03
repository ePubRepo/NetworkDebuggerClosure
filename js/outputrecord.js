// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Encapsulate one output message from a test.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.OutputRecord');

/**
 * Store a log output from a test along with a timestamp and log level.
 *
 * @param {netdebugger.OutputRecord.DetailLevel} level Level of output record.
 * @param {string} message Message to be recorded.
 * @constructor
 */
netdebugger.OutputRecord = function(level, message) {
  this.timestamp_ = (new Date()).getTime();
  this.level_ = level;
  this.message_ = message;
};


/**
 * Enum for the level of output log information corresponding with a message.
 * @enum {number}
 */
netdebugger.OutputRecord.DetailLevel = {
  ERROR: 0,
  WARNING: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};


/**
 * Timestamp of message.
 * @type {number}
 * @private
 */
netdebugger.OutputRecord.prototype.timestamp_ = null;


/**
 * Detail level of output message.
 * @type {netdebugger.OutputRecord.DetailLevel}
 * @private
 */
netdebugger.OutputRecord.prototype.level_ = null;


/**
 * Message to be recorded.
 * @type {string}
 * @private
 */
netdebugger.OutputRecord.prototype.message_ = null;


/**
 * Return the timestamp of the record.
 * @return {number} Timestamp of record entry.
 */
netdebugger.OutputRecord.prototype.getTimestamp = function() {
  return this.timestamp_;
};


/**
 * Return the log level for this record entry.
 * @return {netdebugger.OutputRecord.DetailLevel} Level of log entry.
 */
netdebugger.OutputRecord.prototype.getLevel = function() {
  return this.level_;
};


/**
 * Return log message.
 * @return {string} Log message.
 */
netdebugger.OutputRecord.prototype.getMessage = function() {
  return this.message_;
};
