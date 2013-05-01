// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS CNAME record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSRecordCNAME');

goog.require('netdebugger.DNSRecord');

/**
 * CNAME DNS record.
 * @param {string} name Name of the CNAME record.
 * @param {number} ttl Time to live of the record.
 * @extends DNSRecord
 * @constructor
 */
netdebugger.DNSRecordCNAME = function(name, ttl) {
  this.name_ = name;
  this.type_ = netdebugger.DNSUtil.RecordNumber.CNAME;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(netdebugger.DNSRecordCNAME, netdebugger.DNSRecord);


/**
 * Text value.
 * @type {string}
 * @private
 */
netdebugger.DNSRecordCNAME.prototype.cname_ = null;


/**
 * Set the cname of the record.
 * @param {string} cname Text value.
 */
netdebugger.DNSRecordCNAME.prototype.setCname = function(cname) {
  this.cname_ = cname;
};


/**
 * Return the cname stored by this record.
 * @return {string} CNAME value.
 */
netdebugger.DNSRecordCNAME.prototype.getCname = function() {
  return this.cname_;
};
