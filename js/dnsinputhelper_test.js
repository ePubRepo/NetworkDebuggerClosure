// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSInputHelper class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('test.DNSInputHelper');

goog.require('DNSInputHelper');
goog.require('DNSUtil');
goog.require('goog.testing.jsunit');


/**
 * Object to test DNSPacketSerializer class.
 */
test.DNSPacketSerializer = function() {};


/**
 * Create objects for testing.
 */
function setUp() {
  document.body.innerHTML =
    '<body>' +
    '<!-- Begin Page Top -->' +
    '<div class="top-container">' +
    '<div class="center-container">' +
    '<div class="top-header">Network Debugger</div>' +
    '</div>' +
    '</div>' +
    '<div>' +
    '<div class="center-container">' +
    '<div class="sub-menu-contents"><span id="advancedOptionsToggleBtn" ' +
    'class="footer-link">Customize Diagnostics</span> á ' +
    '<span class="footer-link" id="loadTestConfigBtn">Load Test ' +
    'Configuration</span></div>' +
    '</div>' +
    '</div>' +
    '<!-- End Page Top -->' +
    '' +
    '<!-- Configuration Page -->' +
    '<div class="center-container display-none" id="overlay-window-frame">' +
    '<div id="overlay-window-contents">' +
    '<p>Paste configurations you received from Google into the box below ' +
    'and press "Run Tests"</p>' +
    '<p id="test-config-error" class="display-none"></p>' +
    '<textarea id="test-config-input"></textarea>' +
    '<span class="footer-link" id="quitConfigLoadScreenBtn">Back</span>' +
    '<input type="button" class="button button-enabled" value="Run Tests" ' +
    'id="runLoadedTests">' +
    '</div>' +
    '</div>' +
    '' +
    '<!-- Main Page Contents -->' +
    '<div id="page-contents">' +
    '' +
    '<div class="center-container display-none" id="test-detailed-options">' +
    '<div id="left">' +
    '<div class="column-header">Telnet Tests</div>' +
    '<input type="checkbox" value="google.com-http" ' +
    'id="google-com-http-telnet" checked="checked">' +
    '<label for="google-com-http-telnet">google.com HTTP</label><br>' +
    '<input type="checkbox" value="mail.google.com-http" ' +
    'id="mail-google-com-http-telnet" checked="checked"><label ' +
    'for="mail-google-com-http-telnet">mail.google.com HTTP</label><br>' +
    '<input type="checkbox" value="drive.google.com-http" ' +
    'id="drive-google-com-http-telnet" checked="checked"><label ' +
    'for="drive-google-com-http-telnet">drive.google.com HTTP</label><br>' +
    '</div>' +
    '' +
    '<div id="right">' +
    '<div class="column-header">More</div>' +
    '<input type="checkbox" id="network-interface-information" ' +
    'checked="checked"><label for="network-interface-information">Interface ' +
    'Information</label>' +
    '</div>' +
    '' +
    '<div id="middle">' +
    '<div class="column-header">DNS Tests</div>' +
    '<input type="text" value="google.com" id="dnsHostname" size="25" ' +
    'class="textbox">' +
    '<select id="dnsRecordType" class="select">' +
    '<option selected="selected">A</option>' +
    '<option>AAAA</option>' +
    '<option>MX</option>' +
    '<option>TXT</option>' +
    '<option>CNAME</option>' +
    '</select>' +
    '<br>' +
    '<br>' +
    '<input type="checkbox" id="g-dns" checked="checked">' +
    '<label for="g-dns">Google DNS</label><br>' +
    '<input type="checkbox" id="l3-dns" checked="checked">' +
    '<label for="l3-dns">Level 3</label><br>' +
    '<input type="checkbox" id="o-dns" checked="checked">' +
    '<label for="o-dns">Open DNS</label><br>' +
    '<input type="checkbox" id="customDnsBtn">' +
    '<input type="text" value="Custom Resolver IP" id="dnsResolver"' +
    'size="25" class="textbox">' +
    '<hr>' +
    '<input type="checkbox" id="whoAmIDnsBtn"><label ' +
    'for="whoAmIDnsBtn">Discover Resolver</label>' +
    '</div>' +
    '</div>' +
    '<div class="center-container display-full" ' +
    'id="run-diagnostics-container">' +
    '<div><input type="button" ' +
    'class="button button-enabled extra-large-button" ' +
    'value="Run Diagnostics" id="runDiagnosticsBtn"></div>' +
    '</div>' +
    '' +
    '<div class="center-container display-none" id="test-output-area">' +
    '<textarea id="console" readonly="readonly"></textarea>' +
    '<div>' +
    '<input type="button" class="button button-enabled" value="Clear" ' +
    'id="consoleClearBtn">' +
    '<input type="button" class="button button-enabled" value="Copy" ' +
    'id="consoleCopyBtn">' +
    '</div>' +
    '</div>' +
    '</div>';
}


/**
 * Test the testSerializePacket() method.
 */
function testIsValidHostnameEntered() {
  var inputHelper = new DNSInputHelper();
  assertTrue(inputHelper.isValidHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail';
  assertFalse(inputHelper.isValidHostnameEntered());
}


/**
 * Test the getHostnameEntered() method.
 */
function testGetHostnameEntered() {
  var inputHelper = new DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getCustomResolverIp() method.
 */
function testGetCustomResolverIp() {
  var inputHelper = new DNSInputHelper();
  assertEquals('google.com', inputHelper.getHostnameEntered());

  document.getElementById('dnsHostname').value = 'mail.google.com';
  assertEquals('mail.google.com', inputHelper.getHostnameEntered());
}


/**
 * Test the getRecordType() method.
 */
function testGetRecordType() {
  var inputHelper = new DNSInputHelper();
  assertEquals(DNSUtil.RecordNumber.A, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 1;
  assertEquals(DNSUtil.RecordNumber.AAAA, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 2;
  assertEquals(DNSUtil.RecordNumber.MX, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 3;
  assertEquals(DNSUtil.RecordNumber.TXT, inputHelper.getRecordType());

  document.getElementById('dnsRecordType').selectedIndex = 4;
  assertEquals(DNSUtil.RecordNumber.CNAME, inputHelper.getRecordType());
}
