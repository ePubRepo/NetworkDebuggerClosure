goog.provide('test.Util');

goog.require('Util');
goog.require('goog.testing.jsunit');

test.Util = function();

function testBaseConversion() {
  assertFalse('1', Util.baseConversion(2, 2));
}; 
