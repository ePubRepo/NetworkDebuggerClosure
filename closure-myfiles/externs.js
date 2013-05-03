var console = function() {};
console.log = function(str) {return true};
console.warn = function(str) {return true};

var chrome = function() {};
chrome.socket = function() {};
chrome.socket.disconnect = function(socketId) {};
chrome.socket.getInfo = function(socketId, callbackFnc) {};
chrome.socket.getNetworkList = function(callbackFnc) {};
chrome.socket.create = function(type, add, callbackFnc) {};
chrome.socket.destroy = function(socketId) {};
chrome.socket.connect = function(socketId, hostname, port, callbackFnc) {};
chrome.socket.write = function(socketId, arrBuff, callbackFnc) {};
chrome.socket.read = function(socketId, callbackFnc) {};

var CreatedInfo = function() {};

var WriteInfo = function() {};

var ReadInfo = function() {};

var SocketInfo = function() {};
SocketInfo.localPort;
SocketInfo.peerPort;
SocketInfo.socketType;
SocketInfo.localAddress;
SocketInfo.peerAddress;