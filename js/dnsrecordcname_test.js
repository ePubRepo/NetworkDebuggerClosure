// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSRecordCNAME class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSRecordCNAME');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSRecordCNAME');
goog.require('ndebug.DNSUtil');

goog.setTestOnly('Tests for DNSRecordCNAME');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordCNAME1 = new ndebug.DNSRecordCNAME('t1.com', 555);
  myDnsRecordCNAME1.setCname('mail.t1.com');
  myDnsRecordCNAME2 = new ndebug.DNSRecordCNAME('t2.com', 550);
  myDnsRecordCNAME2.setCname('drive.t2.com');
}


/**
 * Test the getName() method.
 */
function testGetName() {
  assertEquals('t1.com', myDnsRecordCNAME1.getName());
  assertEquals('t2.com', myDnsRecordCNAME2.getName());
}


/**
 * Test the getType() method.
 */
function testGetType() {
  assertEquals(ndebug.DNSUtil.RecordNumber.CNAME, myDnsRecordCNAME1.getType());
  assertEquals(ndebug.DNSUtil.RecordNumber.CNAME, myDnsRecordCNAME2.getType());
}


/**
 * Test the getTTL() method.
 */
function testTtl() {
  assertEquals(555, myDnsRecordCNAME1.getTTL());
  assertEquals(550, myDnsRecordCNAME2.getTTL());
}


/**
 * Test the getCname() method.
 */
function testGetCname() {
  assertEquals('mail.t1.com', myDnsRecordCNAME1.getCname());
  assertEquals('drive.t2.com', myDnsRecordCNAME2.getCname());
}
