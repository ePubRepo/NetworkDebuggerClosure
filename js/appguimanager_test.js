// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for AppGuiManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.AppGuiManager');

goog.require('AppGuiManager');
goog.require('TestHelper');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for AppGuiManager');


/**
 * Create objects for testing.
 */
function setUp() {
  var myTestHelper = new TestHelper();
  myTestHelper.setupDom();
}


/**
 * Test the consoleClearBtnClicked() method.
 */
function testConsoleClearBtnClicked() {
  document.getElementById('console').value = 'testing testing testing';
  AppGuiManager.consoleClearBtnClicked();
  assertTrue(document.getElementById('console').value.length == 0);
}


/**
 * Test the hideLoadTestConfigurationsGui() method.
 */
function testHideLoadTestConfigurationsGui() {
  AppGuiManager.showLoadTestConfigurationsGui();
  assertTrue(document.getElementById('page-contents').className ==
    'display-none');
  AppGuiManager.hideLoadTestConfigurationsGui();
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
  AppGuiManager.displayParseError(testingErrorText);
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
  AppGuiManager.printOutputToScreenConsole(testString,
      OutputRecord.DetailLevel.INFO, new Date());
  assertTrue(
      document.getElementById('console').value.indexOf(testString) != -1);
}
