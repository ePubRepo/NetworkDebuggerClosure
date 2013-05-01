// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS AAAA record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSRecordAAAA');

goog.require('netdebugger.DNSRecord');

/**
 * DNS AAAA record, storing the IPv6 address, name, TTL, etc.
 * @param {string} name Name of the AAAA record.
 * @param {number} ttl Time to live.
 * @extends netdebugger.DNSRecord
 * @constructor
 */
netdebugger.DNSRecordAAAA = function(name, ttl) {
  this.name_ = name;
  this.type_ = netdebugger.DNSUtil.RecordNumber.AAAA;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(netdebugger.DNSRecordAAAA, netdebugger.DNSRecord);


/**
 * IPv6 address.
 * @type {string}
 * @private
 */
netdebugger.DNSRecordAAAA.prototype.ip_ = null;


/**
 * Set the IPv6 address of the record.
 * @param {string} ip IPv6 address.
 */
netdebugger.DNSRecordAAAA.prototype.setIp = function(ip) {
  this.ip_ = ip;
};


/**
 * Return the IPv6 address pointed to by this AAAA record.
 * @return {string} IPv6 address.
 */
netdebugger.DNSRecordAAAA.prototype.getIp = function() {
  return this.ip_;
};
