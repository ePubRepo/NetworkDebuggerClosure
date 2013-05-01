// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS MX record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.DNSRecordMX');

goog.require('netdebugger.DNSRecord');

/**
 * MX Record.
 * @param {string} name Name of the MX record.
 * @param {number} ttl Time to live of the record.
 * @extends netdebugger.DNSRecord
 * @constructor
 */
netdebugger.DNSRecordMX = function(name, ttl) {
  this.name_ = name;
  this.type_ = netdebugger.DNSUtil.RecordNumber.MX;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(netdebugger.DNSRecordMX, netdebugger.DNSRecord);


/**
 * Mail exchange host.
 * @type {string}
 * @private
 */
netdebugger.DNSRecordMX.prototype.mailExchanger_ = null;


/**
 * Preference number of the record.
 * @type {number}
 * @private
 */
netdebugger.DNSRecordMX.prototype.preferenceNumber_ = null;


/**
 * Set the mail exchange of the record.
 * @param {string} mx Mail exchange address.
 */
netdebugger.DNSRecordMX.prototype.setMailExchanger = function(mx) {
  this.mailExchanger_ = mx;
};


/**
 * Return the mail exchange pointed to by this MX record.
 * @return {string} Mail exchange address.
 */
netdebugger.DNSRecordMX.prototype.getMailExchanger = function() {
  return this.mailExchanger_;
};


/**
 * Set the preference number of the record.
 * @param {number} n Preference number.
 */
netdebugger.DNSRecordMX.prototype.setPreferenceNumber = function(n) {
  this.preferenceNumber_ = n;
};


/**
 * Return the preference number of this MX record.
 * @return {number} MX record preference number.
 */
netdebugger.DNSRecordMX.prototype.getPreferenceNumber = function() {
  return this.preferenceNumber_;
};
