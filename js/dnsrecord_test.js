// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecord class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSRecord');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSRecord');
goog.require('ndebug.DNSUtil');

goog.setTestOnly('Tests for ndebug.DNSRecord');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordA = new ndebug.DNSRecord('t.com',
      ndebug.DNSUtil.RecordNumber.A, 1, 555);
  myDnsRecordAAAA = new ndebug.DNSRecord('t.com',
      ndebug.DNSUtil.RecordNumber.AAAA, 1, 550);
  myDnsRecordCNAME = new ndebug.DNSRecord('t.com',
      ndebug.DNSUtil.RecordNumber.CNAME, 1, 525);
  myDnsRecordMX = new ndebug.DNSRecord('t.com',
      ndebug.DNSUtil.RecordNumber.MX, 1, 500);
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
  assertEquals(ndebug.DNSUtil.RecordNumber.A, myDnsRecordA.getType());
  assertEquals(ndebug.DNSUtil.RecordNumber.AAAA, myDnsRecordAAAA.getType());
  assertEquals(ndebug.DNSUtil.RecordNumber.CNAME, myDnsRecordCNAME.getType());
  assertEquals(ndebug.DNSUtil.RecordNumber.MX, myDnsRecordMX.getType());
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
