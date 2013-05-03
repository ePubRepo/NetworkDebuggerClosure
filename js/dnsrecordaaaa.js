// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS AAAA record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.DNSRecordAAAA');

goog.require('ndebug.DNSRecord');

/**
 * DNS AAAA record, storing the IPv6 address, name, TTL, etc.
 * @param {string} name Name of the AAAA record.
 * @param {number} ttl Time to live.
 * @extends ndebug.DNSRecord
 * @constructor
 */
ndebug.DNSRecordAAAA = function(name, ttl) {
  this.name_ = name;
  this.type_ = ndebug.DNSUtil.RecordNumber.AAAA;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(ndebug.DNSRecordAAAA, ndebug.DNSRecord);


/**
 * IPv6 address.
 * @type {string}
 * @private
 */
ndebug.DNSRecordAAAA.prototype.ip_ = null;


/**
 * Set the IPv6 address of the record.
 * @param {string} ip IPv6 address.
 */
ndebug.DNSRecordAAAA.prototype.setIp = function(ip) {
  this.ip_ = ip;
};


/**
 * Return the IPv6 address pointed to by this AAAA record.
 * @return {string} IPv6 address.
 */
ndebug.DNSRecordAAAA.prototype.getIp = function() {
  return this.ip_;
};
