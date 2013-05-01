// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS TXT record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSRecordTXT');

goog.require('netdebugger.DNSRecord');

/**
 * TXT record.
 * @param {string} name Name of the TXT record.
 * @param {number} ttl Time to live of the record.
 * @extends netdebugger.DNSRecord
 * @constructor
 */
netdebugger.DNSRecordTXT = function(name, ttl) {
  this.name_ = name;
  this.type_ = netdebugger.DNSUtil.RecordNumber.TXT;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(netdebugger.DNSRecordTXT, netdebugger.DNSRecord);


/**
 * Text value.
 * @type {string}
 * @private
 */
netdebugger.DNSRecordTXT.prototype.txt_ = null;


/**
 * Set the text of the record.
 * @param {string} txt Text value.
 */
netdebugger.DNSRecordTXT.prototype.setText = function(txt) {
  this.txt_ = txt;
};


/**
 * Return the text value stored by this TXT record.
 * @return {string} Text value.
 */
netdebugger.DNSRecordTXT.prototype.getText = function() {
  return this.txt_;
};
