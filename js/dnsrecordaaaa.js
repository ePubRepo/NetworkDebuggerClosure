// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS AAAA record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('DNSRecordAAAA');

goog.require('DNSRecord');

/**
 * DNS AAAA record, storing the IPv6 address, name, TTL, etc.
 * @param {string} name Name of the AAAA record.
 * @param {integer} ttl Time to live.
 * @extends DNSRecord
 * @constructor
 */
DNSRecordAAAA = function(name, ttl) {
  this.name_ = name;
  this.type_ = DNSUtil.RecordNumber.AAAA;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(DNSRecordAAAA, DNSRecord);


/**
 * IPv6 address.
 * @type {string}
 * @private
 */
DNSRecordAAAA.prototype.ip_ = null;


/**
 * Set the IPv6 address of the record.
 * @param {string} ip IPv6 address.
 */
DNSRecordAAAA.prototype.setIp = function(ip) {
  this.ip_ = ip;
};


/**
 * Return the IPv6 address pointed to by this AAAA record.
 * @return {string} IPv6 address.
 */
DNSRecordAAAA.prototype.getIp = function() {
  return this.ip_;
};
