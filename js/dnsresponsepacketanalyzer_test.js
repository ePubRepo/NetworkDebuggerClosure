// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSResponsePacketAnalyzer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSResponsePacketAnalyzer');

goog.require('netdebugger.DNSQueryManager');
goog.require('netdebugger.DNSRecord');
goog.require('netdebugger.DNSResponsePacketAnalyzer');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for netdebugger.DNSResponsePacketAnalyzer');


/**
 * Test the isIp4AddressInCidrBlock() method.
 */
function testIsIp4AddressInCidrBlock() {
  assertTrue(netdebugger.DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.194.0.0', '173.194.0.0/16'));
  assertFalse(netdebugger.DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.192.0.0', '173.194.0.0/16'));
  assertTrue(netdebugger.DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.194.1.1', '173.194.0.0/16'));
  assertFalse(netdebugger.DNSResponsePacketAnalyzer.isIp4AddressInCidrBlock(
      '173.195.0.0', '173.194.0.0/16'));
}


/**
 * Test the isGoogleIp4Address() method.
 */
function testIsGoogleIp4Address() {
  assertTrue(netdebugger.DNSResponsePacketAnalyzer.isGoogleIp4Address('74.125.224.110'));
  assertFalse(netdebugger.DNSResponsePacketAnalyzer.isGoogleIp4Address('99.23.29.13'));
  assertFalse(netdebugger.DNSResponsePacketAnalyzer.isGoogleIp4Address('209.230.12.23'));
}
