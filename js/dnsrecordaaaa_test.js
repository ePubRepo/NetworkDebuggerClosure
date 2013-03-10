// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecordAAAA class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSRecordAAAA');

goog.require('DNSRecord');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');


/**
 * Object to test DNSRecordAAAA class.
 */
test.DNSRecordAAAA = function() {};


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordAAAA1 = new DNSRecordAAAA('t1.com', 550);
  myDnsRecordAAAA2 = new DNSRecordAAAA('t2.com', 500);
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
  assertEquals(DNSUtil.RecordNumber.A, myDnsRecordA.getType());
  assertEquals(DNSUtil.RecordNumber.AAAA, myDnsRecordAAAA.getType());
  assertEquals(DNSUtil.RecordNumber.CNAME, myDnsRecordCNAME.getType());
  assertEquals(DNSUtil.RecordNumber.MX, myDnsRecordMX.getType());
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
