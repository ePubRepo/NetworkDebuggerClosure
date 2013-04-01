// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview DNS MX record.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('DNSRecordMX');

goog.require('DNSRecord');

/**
 * MX Record.
 * @param {string} name Name of the MX record.
 * @param {number} ttl Time to live of the record.
 * @extends DNSRecord
 * @constructor
 */
DNSRecordMX = function(name, ttl) {
  this.name_ = name;
  this.type_ = DNSUtil.RecordNumber.MX;
  this.cl_ = 1;
  this.ttl_ = ttl;
};
goog.inherits(DNSRecordMX, DNSRecord);


/**
 * Mail exchange host.
 * @type {string}
 * @private
 */
DNSRecordMX.prototype.mailExchanger_ = null;


/**
 * Preference number of the record.
 * @type {number}
 * @private
 */
DNSRecordMX.prototype.preferenceNumber_ = null;


/**
 * Set the mail exchange of the record.
 * @param {string} mx Mail exchange address.
 */
DNSRecordMX.prototype.setMailExchanger = function(mx) {
  this.mailExchanger_ = mx;
};


/**
 * Return the mail exchange pointed to by this MX record.
 * @return {string} Mail exchange address.
 */
DNSRecordMX.prototype.getMailExchanger = function() {
  return this.mailExchanger_;
};


/**
 * Set the preference number of the record.
 * @param {number} n Preference number.
 */
DNSRecordMX.prototype.setPreferenceNumber = function(n) {
  this.preferenceNumber_ = n;
};


/**
 * Return the preference number of this MX record.
 * @return {number} MX record preference number.
 */
DNSRecordMX.prototype.getPreferenceNumber = function() {
  return this.preferenceNumber_;
};
