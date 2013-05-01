// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS A record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSRecordA');

goog.require('netdebugger.DNSRecord');

/**
 * DNS A-record, storing the name, TTL, IP, etc..
 * @param {string} name Name of the A record.
 * @param {number} ttl Time to live.
 * @extends DNSRecord
 * @constructor
 */
netdebugger.DNSRecordA = function(name, ttl) {
  this.name_ = name;
  this.type_ = netdebugger.DNSUtil.RecordNumber.A;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(netdebugger.DNSRecordA, netdebugger.DNSRecord);


/**
 * IPv4 address.
 * @type {string}
 * @private
 */
netdebugger.DNSRecordA.prototype.ip_ = null;


/**
 * Set the IPv4 address of the record.
 * @param {string} ip IPv4 address.
 */
netdebugger.DNSRecordA.prototype.setIp = function(ip) {
  this.ip_ = ip;
};


/**
 * Return the IPv4 address pointed to by this A record.
 * @return {string} IPv4 address.
 */
netdebugger.DNSRecordA.prototype.getIp = function() {
  return this.ip_;
};
