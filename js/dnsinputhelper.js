// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Parse and validate inputs.
 *
 * @author ebeach@google.com (Eric Beach)
 */


goog.provide('netdebugger.DNSInputHelper');

goog.require('netdebugger.DNSUtil');


/**
 * Assist with handeling DNS input from the App.
 * @constructor
 */
netdebugger.DNSInputHelper = function() {};


/**
 * DOM ID of the DNS hostname field.
 * @type {string}
 * @private
 */
netdebugger.DNSInputHelper.prototype.domIdDnsHostname_ = 'dnsHostname';


/**
 * DOM ID of the DNS record type field.
 * @type {string}
 * @private
 */
netdebugger.DNSInputHelper.prototype.domIdDnsRecordType_ = 'dnsRecordType';


/**
 * DOM ID of the custom DNS resolver field.
 * @type {string}
 * @private
 */
netdebugger.DNSInputHelper.prototype.domIdDnsCustomResolverIp_ = 'dnsResolver';


/**
 * Determines whether the hostname is valid.
 * @return {boolean} True if the hostname is valid.
 */
//TODO: Substitute in a regular expression
netdebugger.DNSInputHelper.prototype.isValidHostnameEntered = function() {
  var hostname = document.getElementById(this.domIdDnsHostname_).value;
  return (hostname.length >= 3 && hostname.indexOf('.') != -1);
};


/**
 * Obtain the hostname the user provided for lookup.
 * @return {string} Hostname user provided.
 */
netdebugger.DNSInputHelper.prototype.getHostnameEntered = function() {
  return document.getElementById(this.domIdDnsHostname_).value;
};


/**
 * Obtain the DNS resolver IP the user wishes to use for lookups.
 * @return {boolean} True if the ip is valid.
 */
netdebugger.DNSInputHelper.prototype.isValidCustomResolverIpEntered = function() {
  //TODO: implement this in future versions
  var ip = document.getElementById(this.domIdDnsCustomResolverIp_).value;
  return true;
};


/**
 * Obtain the hostname the user provided for lookup.
 * @return {string} User provided resolver IP.
 */
netdebugger.DNSInputHelper.prototype.getCustomResolverIp = function() {
  return document.getElementById(this.domIdDnsCustomResolverIp_).value;
};


/**
 * Obtain the DNS record type number the user wishes to lookup.
 * @return {number} DNS record type number.
 */
netdebugger.DNSInputHelper.prototype.getRecordType = function() {
  var recordTypeName = document.getElementById(this.domIdDnsRecordType_).value;
  return netdebugger.DNSUtil.getRecordTypeNumByRecordTypeName(recordTypeName);
};
