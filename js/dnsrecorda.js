// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS A record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('DNSRecordA');

goog.require('DNSRecord');

/**
 * DNS A-record, storing the name, TTL, IP, etc..
 * @param {string} name Name of the A record.
 * @param {integer} ttl Time to live.
 * @extends DNSRecord
 * @constructor
 */
DNSRecordA = function(name, ttl) {
  this.name_ = name;
  this.type_ = DNSUtil.RecordNumber.A;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(DNSRecordA, DNSRecord);


/**
 * IPv4 address.
 * @type {string}
 * @private
 */
DNSRecordA.prototype.ip_ = null;


/**
 * Set the IPv4 address of the record.
 * @param {string} ip IPv4 address.
 */
DNSRecordA.prototype.setIp = function(ip) {
  this.ip_ = ip;
};


/**
 * Return the IPv4 address pointed to by this A record.
 * @return {string} IPv4 address.
 */
DNSRecordA.prototype.getIp = function() {
  return this.ip_;
};
