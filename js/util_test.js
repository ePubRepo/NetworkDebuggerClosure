// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for Utility class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.Util');

goog.require('Util');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for Util');


function testBaseConversion() {
  assertEquals('10', Util.baseConversion(2, 2));
  assertEquals('100', Util.baseConversion(4, 2));
}
