// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS TXT record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.DNSRecordTXT');

goog.require('ndebug.DNSRecord');

/**
 * TXT record.
 * @param {string} name Name of the TXT record.
 * @param {number} ttl Time to live of the record.
 * @extends ndebug.DNSRecord
 * @constructor
 */
ndebug.DNSRecordTXT = function(name, ttl) {
  this.name_ = name;
  this.type_ = ndebug.DNSUtil.RecordNumber.TXT;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(ndebug.DNSRecordTXT, ndebug.DNSRecord);


/**
 * Text value.
 * @type {string}
 * @private
 */
ndebug.DNSRecordTXT.prototype.txt_ = null;


/**
 * Set the text of the record.
 * @param {string} txt Text value.
 */
ndebug.DNSRecordTXT.prototype.setText = function(txt) {
  this.txt_ = txt;
};


/**
 * Return the text value stored by this TXT record.
 * @return {string} Text value.
 */
ndebug.DNSRecordTXT.prototype.getText = function() {
  return this.txt_;
};
