// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Deserialize binary data.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('Deserializer');

/**
 * Deserializer consumes data from an ArrayBuffer.
 *
 * @param {ArrayBuffer|Unit8Array} arrBinaryData ArrayBuffer of binary data.
 * @constructor
 */
Deserializer = function(arrBinaryData) {
  if (arrBinaryData instanceof Uint8Array) {
    this.view_ = arrBinaryData;
  } else {
    this.view_ = new Uint8Array(arrBinaryData);
  }
  this.loc_ = 0;
};


/**
 * Byte number of the internal pointer used to read through the ArrayBuffer.
 * @type {integer}
 * @private
 */
Deserializer.prototype.loc_ = 0;


/**
 * ArrayBuffer storing binary data to be deserialized.
 * @type {Unit8Array}
 * @private
 */
Deserializer.prototype.view_ = null;

/**
 * Determine whether Deserializer has read through all input data.
 * @return {boolean} Whether this DataConsumer has consumed all its data.
 * @private
 */
Deserializer.prototype.isEOF_ = function() {
  //check if current location, in bytes, is greater than length of data
  return (this.loc_ >= this.view_.byteLength);
};


/**
 * Return a sub array starting from the current location of a specified length.
 * @param {integer} length Number of bytes to return from front of the view.
 * @return {Uint8Array} A subsection of the larger ArrayBuffer.
 */
Deserializer.prototype.slice = function(length) {
  var view = this.view_.subarray(this.loc_, this.loc_ + length);
  this.loc_ += length;
  return view;
};


/**
 * Return the next byte of data as a decimal.
 * @return {integer} Integer representing data stored in a single byte.
 */
Deserializer.prototype.getByte = function() {
  this.loc_ += 1;
  return this.view_[this.loc_ - 1];
};


/**
 * Return the next two bytes of data as a base 10 integer.
 * @return {integer} Two bytes of data as a base 10 integer.
 */
Deserializer.prototype.getShort = function() {
  return (this.getByte() << 8) + this.getByte();
};


/**
 * Return the next four bytes of data as a base 10 integer.
 * @return {integer} Four bytes of data as a base 10 integer.
 */
Deserializer.prototype.getLong = function() {
  return (this.getShort() << 16) + this.getShort();
};


/**
 * Return the number of bytes read this far in the process of deserializer.
 * @return {integer} Number of bytes read.
 */
Deserializer.prototype.getBytesRead = function() {
  return this.loc_;
};


/**
 * Return the total number of bytes received to parse.
 * @return {integer} Total number of bytes received in the input ArrayBuffer.
 */
Deserializer.prototype.getTotalBytes = function() {
  return this.view_.byteLength;
};
