// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecord class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSRecord');

goog.require('goog.testing.jsunit');
goog.require('netdebugger.DNSRecord');
goog.require('netdebugger.DNSUtil');

goog.setTestOnly('Tests for netdebugger.DNSRecord');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordA = new netdebugger.DNSRecord('t.com', netdebugger.DNSUtil.RecordNumber.A, 1, 555);
  myDnsRecordAAAA = new netdebugger.DNSRecord('t.com', netdebugger.DNSUtil.RecordNumber.AAAA, 1, 550);
  myDnsRecordCNAME = new netdebugger.DNSRecord('t.com', netdebugger.DNSUtil.RecordNumber.CNAME, 1, 525);
  myDnsRecordMX = new netdebugger.DNSRecord('t.com', netdebugger.DNSUtil.RecordNumber.MX, 1, 500);
}


/**
 * Test the getName() method.
 */
function testGetName() {
  assertEquals('t.com', myDnsRecordA.getName());
  assertEquals('t.com', myDnsRecordAAAA.getName());
  assertEquals('t.com', myDnsRecordCNAME.getName());
  assertEquals('t.com', myDnsRecordMX.getName());
}


/**
 * Test the getType() method.
 */
function testGetType() {
  assertEquals(netdebugger.DNSUtil.RecordNumber.A, myDnsRecordA.getType());
  assertEquals(netdebugger.DNSUtil.RecordNumber.AAAA, myDnsRecordAAAA.getType());
  assertEquals(netdebugger.DNSUtil.RecordNumber.CNAME, myDnsRecordCNAME.getType());
  assertEquals(netdebugger.DNSUtil.RecordNumber.MX, myDnsRecordMX.getType());
}


/**
 * Test the getTTL() method.
 */
function testTtl() {
  assertEquals(555, myDnsRecordA.getTTL());
  assertEquals(550, myDnsRecordAAAA.getTTL());
  assertEquals(525, myDnsRecordCNAME.getTTL());
  assertEquals(500, myDnsRecordMX.getTTL());
}
