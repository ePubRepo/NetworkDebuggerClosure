// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Bootstrap the network debugging application.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger');

goog.provide('netdebugger.Bootstrap');
goog.require('netdebugger.AppGuiManager');

/**
 * Bootstrap the network debugger app.
 *
 * @constructor
 */
netdebugger.Bootstrap = function() {
  this.addDomEventListeners();
};

/**
 * Add event listeners to the GUI.
 */
netdebugger.Bootstrap.prototype.addDomEventListeners = function() {
  // add listeners for running general diagnostics
  document.getElementById('runDiagnosticsBtn').addEventListener('click',
      netdebugger.AppGuiManager.runDiagnostics, false);
  document.getElementById('advancedOptionsToggleBtn').addEventListener('click',
      netdebugger.AppGuiManager.toggleAdvancedOptions, false);

  // add listeners for loading, quitting, or running test configurations
  document.getElementById('loadTestConfigBtn').addEventListener('click',
      netdebugger.AppGuiManager.showLoadTestConfigurationsGui, false);
  document.getElementById('quitConfigLoadScreenBtn').addEventListener('click',
      netdebugger.AppGuiManager.hideLoadTestConfigurationsGui, false);
  document.getElementById('runLoadedTests').addEventListener('click',
      netdebugger.AppGuiManager.processInputTestConfigurations, false);

  // add listeners to console control
  document.getElementById('consoleClearBtn')
      .addEventListener('click', netdebugger.AppGuiManager.consoleClearBtnClicked, false);
  document.getElementById('consoleCopyBtn')
      .addEventListener('click', netdebugger.AppGuiManager.consoleCopyBtnClicked, false);
};


goog.require('netdebugger.OutputRecordManager');
goog.require('netdebugger.DNSInputHelper');
goog.require('netdebugger.NetworkInterfaceInformation');
goog.require('netdebugger.DNSResponsePacketAnalyzer');

// function for callback and display of DNS results
// TODO: Turn this into an object
function finishedDnsFnc(completedDnsQueryManager) {
  var analyzer = new netdebugger.DNSResponsePacketAnalyzer(completedDnsQueryManager);
  analyzer.defaultPrintResponse();
  var analyzedQueryManager = analyzer.getDnsQueryManager();
  var finishedOutputRecordManager =
    analyzer.getDnsQueryManager().getOutputRecordManager();
  var finishedOutputRecords = finishedOutputRecordManager.getOutputRecords();

  for (var n = 0; n < finishedOutputRecords.length; n++) {
    AppGuiManager.printOutputToScreenConsole(
               finishedOutputRecords[n].getMessage(),
               finishedOutputRecords[n].getLevel(),
               finishedOutputRecords[n].getTimestamp());
  }
}

function basicDiagnostics() {
  // hosts to query Google Public DNS

  for (var i = 0; i < Util.hostnamesToTest.length; i++) {
    var outputRecordManager = new netdebugger.OutputRecordManager();
    var gDnsQuery = new netdebugger.DNSQueryManager(netdebugger.Util.hostnamesToTest[i],
        netdebugger.DNSUtil.RecordNumber.A,
        '8.8.8.8',
        finishedDnsFnc,
        outputRecordManager);
    gDnsQuery.sendRequest();
  }
}

function l3DnsBtnClick() {
   var inputHelper = new netdebugger.DNSInputHelper();
   if (inputHelper.isValidHostnameEntered()) {
     var outputRecordManager = new netdebugger.OutputRecordManager();
     var gDnsQuery = new netdebugger.DNSQueryManager(inputHelper.getHostnameEntered(),
         inputHelper.getRecordType(),
         '209.244.0.3',
         finishedDnsFnc,
         outputRecordManager);
     gDnsQuery.sendRequest();
   }
}


function oDnsBtnClick() {
   var inputHelper = new netdebugger.DNSInputHelper();
   if (inputHelper.isValidHostnameEntered()) {
     var outputRecordManager = new netdebugger.OutputRecordManager();
     var gDnsQuery = new netdebugger.DNSQueryManager(inputHelper.getHostnameEntered(),
         inputHelper.getRecordType(),
         '208.67.222.222',
         finishedDnsFnc,
         outputRecordManager);
     gDnsQuery.sendRequest();
   }
}


function gDnsBtnClick() {
   var inputHelper = new netdebugger.DNSInputHelper();
   if (inputHelper.isValidHostnameEntered()) {
     var outputRecordManager = new netdebugger.OutputRecordManager();
     var gDnsQuery = new netdebugger.DNSQueryManager(inputHelper.getHostnameEntered(),
         inputHelper.getRecordType(),
         '8.8.8.8',
         finishedDnsFnc,
         outputRecordManager);
     gDnsQuery.sendRequest();
   }
}


function whoAmIDnsBtnClick() {
  var outputRecordManager = new netdebugger.OutputRecordManager();
    var gDnsQuery = new netdebugger.DNSQueryManager('o-o.myaddr.google.com',
            DNSUtil.RecordNumber.TXT,
            '8.8.8.8',
            finishedDnsFnc,
            outputRecordManager);
        gDnsQuery.sendRequest();
}


function customDnsBtnClick() {
    var inputHelper = new netdebugger.DNSInputHelper();
    if (inputHelper.isValidHostnameEntered() &&
            inputHelper.isValidCustomResolverIpEntered()) {
      var outputRecordManager = new netdebugger.OutputRecordManager();
      var gDnsQuery = new netdebugger.DNSQueryManager(inputHelper.getHostnameEntered(),
          inputHelper.getRecordType(),
          inputHelper.getCustomResolverIp(),
          finishedDnsFnc,
          outputRecordManager);
      gDnsQuery.sendRequest();
    }
}


function printFinishedTelnetOutput(outputRecordManager) {
  var nicOutputRecords = outputRecordManager.getOutputRecords();
  for (var j = 0; j < nicOutputRecords.length; j++) {
    AppGuiManager.printOutputToScreenConsole(
               nicOutputRecords[j].getMessage(),
               nicOutputRecords[j].getLevel(),
               nicOutputRecords[j].getTimestamp());
  }
}

function gHttpBtnClick() {
  var outputRecordManager = new netdebugger.OutputRecordManager();
  var objTelnet = new netdebugger.Telnet('www.google.com', 80, outputRecordManager);
   objTelnet.
      setPlainTextDataToSend('GET / HTTP/1.1\r\nHost: www.google.com\r\n\r\n');
   objTelnet.setCompletedCallbackFnc(printFinishedTelnetOutput);
   objTelnet.createSocket();
}


function mHttpBtnClick() {
  var outputRecordManager = new netdebugger.OutputRecordManager();
  var objTelnet = new netdebugger.Telnet('mail.google.com', 80, outputRecordManager);
   objTelnet.
      setPlainTextDataToSend('GET / HTTP/1.1\r\nHost: mail.google.com\r\n\r\n');
   objTelnet.setCompletedCallbackFnc(printFinishedTelnetOutput);
   objTelnet.createSocket();
}


function dHttpBtnClick() {
  var outputRecordManager = new netdebugger.OutputRecordManager();
  var objTelnet = new netdebugger.Telnet('drive.google.com', 80, outputRecordManager);
   objTelnet.
     setPlainTextDataToSend('GET / HTTP/1.1\r\nHost: drive.google.com\r\n\r\n');
   objTelnet.setCompletedCallbackFnc(printFinishedTelnetOutput);
   objTelnet.createSocket();
}

function networkInterfaceInformationBtnClick() {
  function printOutput(outputRecordManager) {
    var nicOutputRecords = outputRecordManager.getOutputRecords();
    for (var j = 0; j < nicOutputRecords.length; j++) {
      netdebugger.AppGuiManager.printOutputToScreenConsole(
                 nicOutputRecords[j].getMessage(),
                 nicOutputRecords[j].getLevel(),
                 nicOutputRecords[j].getTimestamp());
    }
  }

  var outputRecordManager = new netdebugger.OutputRecordManager();
  var nicInfo = new netdebugger.NetworkInterfaceInformation(outputRecordManager,
                                                printOutput);
  nicInfo.getNicInformation();
}

//#ClosureDevModeHack
//Hack to allow Closure to work in development mode with Packaged Apps
//Need to start the Closure dependency process and the timing of loading JS
//files is messed up so start the process only after the framework
//dependencies have loaded. In particular, launch a new Bootstrap();
//at the bottom of the bootstrap.js file, thereby ensuring it has been loaded.
var myBootstrap = new netdebugger.Bootstrap();
