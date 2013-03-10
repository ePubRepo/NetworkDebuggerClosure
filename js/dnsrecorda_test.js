// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecordA class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSRecordA');

goog.require('DNSRecordA');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');


/**
 * Object to test DNSRecordA class.
 */
test.DNSRecordA = function() {};


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordA1 = new DNSRecordA('t1.com', 555);
  myDnsRecordA1.setIp('98.76.54.32');
  myDnsRecordA2 = new DNSRecordA('t2.com', 500);
  myDnsRecordA2.setIp('12.34.56.78');
}


/**
 * Test the getName() method.
 */
function testGetName() {
  assertEquals('t1.com', myDnsRecordA1.getName());
  assertEquals('t2.com', myDnsRecordA2.getName());
}


/**
 * Test the getType() method.
 */
function testGetType() {
  assertEquals(DNSUtil.RecordNumber.A, myDnsRecordA1.getType());
  assertEquals(DNSUtil.RecordNumber.A, myDnsRecordA2.getType());
}


/**
 * Test the getTTL() method.
 */
function testTtl() {
  assertEquals(555, myDnsRecordA1.getTTL());
  assertEquals(500, myDnsRecordA2.getTTL());
}


/**
 * Test the getIp() method.
 */
function testGetIp() {
  assertEquals('98.76.54.32', myDnsRecordA1.getIp());
  assertEquals('12.34.56.78', myDnsRecordA2.getIp());
}
