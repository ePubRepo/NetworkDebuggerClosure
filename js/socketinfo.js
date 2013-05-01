// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Obtain information about a socket.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.SocketInfo');

/**
 * @param {number} id ID of Chrome socket.
 * @param {OutputRecordManager} outputRecordManager Manage and record socket
 *                                                  info.
 * @constructor
 */
netdebugger.SocketInfo = function(id, outputRecordManager) {
  this.socketId_ = id;
  this.outputRecordManager_ = outputRecordManager;
};


/**
 * ID of Chrome socket.
 * @type {number}
 * @private
 */
netdebugger.SocketInfo.prototype.socketId_ = null;


/**
 * Object to manage output records from.
 * @type {OutputRecordManager}
 * @private
 */
netdebugger.SocketInfo.prototype.outputRecordManager_ = null;


/**
 * Set the function to be used for console logging.
 * @param {OutputRecordManager} manager Object to record output information.
 */
netdebugger.SocketInfo.prototype.setOutputRecordManager = function(manager) {
  this.outputRecordManager_ = manager;
};


/**
 * Record information about this socket to an available console function.
 */
netdebugger.SocketInfo.prototype.recordSocketInfo = function() {
  var parseSocketInfo = function(socketInfo) {
    var strSocketInfo = 'A ' + socketInfo.socketType + ' connection from ' +
      socketInfo.localAddress + ':' + socketInfo.localPort + ' to ' +
      socketInfo.peerAddress + ':' + socketInfo.peerPort + ' now exists';

    this.outputRecordManager_.pushEntry(netdebugger.OutputRecord.DetailLevel.DEBUG,
                                        strSocketInfo);
  };

  chrome.socket.getInfo(this.socketId_, parseSocketInfo.bind(this));
};
