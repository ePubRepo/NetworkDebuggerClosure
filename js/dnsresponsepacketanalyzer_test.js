// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSResponsePacketAnalyzer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSResponsePacketAnalyzer');

goog.require('DNSQueryManager');
goog.require('DNSRecord');
goog.require('DNSResponsePacketAnalyzer');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for DNSResponsePacketAnalyzer');


/**
 * Test the isIp4AddressInCidrBlock() method.
 */
function testIsIp4AddressInCidrBlock() {
  assertTrue(DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.194.0.0', '173.194.0.0/16'));
  assertFalse(DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.192.0.0', '173.194.0.0/16'));
  assertTrue(DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.194.1.1', '173.194.0.0/16'));
  assertFalse(DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.195.0.0', '173.194.0.0/16'));
}


/**
 * Test the isGoogleIp4Address() method.
 */
function testIsGoogleIp4Address() {
  assertTrue(DNSResponsePacketAnalyzer.isGoogleIp4Address('74.125.224.110'));
  assertFalse(DNSResponsePacketAnalyzer.isGoogleIp4Address('99.23.29.13'));
  assertFalse(DNSResponsePacketAnalyzer.isGoogleIp4Address('209.230.12.23'));
}
