// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for ndebug.DNSRecordTXT class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.DNSRecordTXT');

goog.require('goog.testing.jsunit');
goog.require('ndebug.DNSRecordTXT');
goog.require('ndebug.DNSUtil');

goog.setTestOnly('Tests for ndebug.DNSRecordTXT');


/**
 * Create objects for testing.
 */
function setUp() {
  myDnsRecordTXT1 = new ndebug.DNSRecordTXT('t1.com', 555);
  myDnsRecordTXT1.setText('v=spf1 include:_spf.google.com ~all');
  myDnsRecordTXT2 = new ndebug.DNSRecordTXT('t2.com', 550);
  myDnsRecordTXT2.setText('v=spf1 ip4:216.73.93.72/31 ~all');
}


/**
 * Test the getName() method.
 */
function testGetName() {
  assertEquals('t1.com', myDnsRecordTXT1.getName());
  assertEquals('t2.com', myDnsRecordTXT2.getName());
}


/**
 * Test the getType() method.
 */
function testGetType() {
  assertEquals(ndebug.DNSUtil.RecordNumber.TXT, myDnsRecordTXT1.getType());
  assertEquals(ndebug.DNSUtil.RecordNumber.TXT, myDnsRecordTXT2.getType());
}


/**
 * Test the getTTL() method.
 */
function testTtl() {
  assertEquals(555, myDnsRecordTXT1.getTTL());
  assertEquals(550, myDnsRecordTXT2.getTTL());
}


/**
 * Test the getText() method.
 */
function testGetText() {
  assertEquals('v=spf1 include:_spf.google.com ~all',
      myDnsRecordTXT1.getText());
  assertEquals('v=spf1 ip4:216.73.93.72/31 ~all', myDnsRecordTXT2.getText());
}
