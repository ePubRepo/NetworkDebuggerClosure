// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for Utility class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.Util');

goog.require('goog.testing.jsunit');
goog.require('ndebug.Util');

goog.setTestOnly('Tests for Util');


function testBaseConversion() {
  assertEquals('10', ndebug.Util.baseConversion(2, 2));
  assertEquals('100', ndebug.Util.baseConversion(4, 2));
}
