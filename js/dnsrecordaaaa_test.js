// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecordAAAA class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSRecordAAAA');

goog.require('goog.testing.jsunit');
goog.require('netdebugger.DNSRecordAAAA');
goog.require('netdebugger.DNSUtil');

goog.setTestOnly('Tests for netdebugger.DNSRecordAAAA');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordAAAA1 = new netdebugger.DNSRecordAAAA('t1.com', 550);
  myDnsRecordAAAA2 = new netdebugger.DNSRecordAAAA('t2.com', 500);
}


/**
 * Test the getName() method.
 */
function testGetName() {
  assertEquals('t1.com', myDnsRecordAAAA1.getName());
  assertEquals('t2.com', myDnsRecordAAAA2.getName());
}


/**
 * Test the getType() method.
 */
function testGetType() {
  assertEquals(netdebugger.DNSUtil.RecordNumber.AAAA, myDnsRecordAAAA1.getType());
  assertEquals(netdebugger.DNSUtil.RecordNumber.AAAA, myDnsRecordAAAA2.getType());
}


/**
 * Test the getTTL() method.
 */
function testTtl() {
  assertEquals(550, myDnsRecordAAAA1.getTTL());
  assertEquals(500, myDnsRecordAAAA2.getTTL());
}
