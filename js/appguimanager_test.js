// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for ndebug.AppGuiManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('ndebug.test.AppGuiManager');

goog.require('goog.testing.jsunit');
goog.require('ndebug.AppGuiManager');
goog.require('ndebug.TestHelper');

goog.setTestOnly('Tests for ndebug.AppGuiManager');


/**
 * Create objects for testing.
 */
function setUp() {
  var myTestHelper = new ndebug.TestHelper();
  myTestHelper.setupDom();
}


/**
 * Test the consoleClearBtnClicked() method.
 */
function testConsoleClearBtnClicked() {
  document.getElementById('console').value = 'testing testing testing';
  ndebug.AppGuiManager.consoleClearBtnClicked();
  assertTrue(document.getElementById('console').value.length == 0);
}


/**
 * Test the hideLoadTestConfigurationsGui() method.
 */
function testHideLoadTestConfigurationsGui() {
  ndebug.AppGuiManager.showLoadTestConfigurationsGui();
  assertTrue(document.getElementById('page-contents').className ==
    'display-none');
  ndebug.AppGuiManager.hideLoadTestConfigurationsGui();
  assertTrue(document.getElementById('page-contents').className ==
    'center-container display-full');
}


/**
 * Test the displayParseError() method.
 */
function testDisplayParseError() {
  var testingErrorText = 'testing error';
  assertTrue(
      document.getElementById('test-config-error').innerHTML.indexOf(
          testingErrorText) == -1);
  ndebug.AppGuiManager.displayParseError(testingErrorText);
  assertTrue(
      document.getElementById('test-config-error').innerHTML.indexOf(
          testingErrorText) != -1);
}


/**
 * Test the printOutputToScreenConsole() method.
 */
function testPrintOutputToScreenConsole() {
  var testString = 'test output record';
  assertTrue(
      document.getElementById('console').value.indexOf(testString) == -1);
  ndebug.AppGuiManager.printOutputToScreenConsole(testString,
      ndebug.OutputRecord.DetailLevel.INFO, new Date());
  assertTrue(
      document.getElementById('console').value.indexOf(testString) != -1);
}
