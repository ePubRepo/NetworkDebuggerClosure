// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for ResponseLabelPointerManager class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.ResponseLabelPointerManager');

goog.require('netdebugger.ResponseLabelPointerManager');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for ResponseLabelPointerManager');


/**
 * Create objects for testing.
 */
function setUp() {
  // mx record query result for google.com
  myArray = new Array();
  myArray[0] = 0;
  myArray[1] = 0;
  myArray[2] = 129;
  myArray[3] = 128;
  myArray[4] = 0;
  myArray[5] = 1;
  myArray[6] = 0;
  myArray[7] = 5;
  myArray[8] = 0;
  myArray[9] = 0;
  myArray[10] = 0;
  myArray[11] = 0;
  myArray[12] = 6;
  myArray[13] = 103;
  myArray[14] = 111;
  myArray[15] = 111;
  myArray[16] = 103;
  myArray[17] = 108;
  myArray[18] = 101;
  myArray[19] = 3;
  myArray[20] = 99;
  myArray[21] = 111;
  myArray[22] = 109;
  myArray[23] = 0;
  myArray[24] = 0;
  myArray[25] = 15;
  myArray[26] = 0;
  myArray[27] = 1;
  myArray[28] = 192;
  myArray[29] = 12;
  myArray[30] = 0;
  myArray[31] = 15;
  myArray[32] = 0;
  myArray[33] = 1;
  myArray[34] = 0;
  myArray[35] = 0;
  myArray[36] = 2;
  myArray[37] = 88;
  myArray[38] = 0;
  myArray[39] = 17;
  myArray[40] = 0;
  myArray[41] = 30;
  myArray[42] = 4;
  myArray[43] = 97;
  myArray[44] = 108;
  myArray[45] = 116;
  myArray[46] = 50;
  myArray[47] = 5;
  myArray[48] = 97;
  myArray[49] = 115;
  myArray[50] = 112;
  myArray[51] = 109;
  myArray[52] = 120;
  myArray[53] = 1;
  myArray[54] = 108;
  myArray[55] = 192;
  myArray[56] = 12;
  myArray[57] = 192;
  myArray[58] = 12;
  myArray[59] = 0;
  myArray[60] = 15;
  myArray[61] = 0;
  myArray[62] = 1;
  myArray[63] = 0;
  myArray[64] = 0;
  myArray[65] = 2;
  myArray[66] = 88;
  myArray[67] = 0;
  myArray[68] = 9;
  myArray[69] = 0;
  myArray[70] = 20;
  myArray[71] = 4;
  myArray[72] = 97;
  myArray[73] = 108;
  myArray[74] = 116;
  myArray[75] = 49;
  myArray[76] = 192;
  myArray[77] = 47;
  myArray[78] = 192;
  myArray[79] = 12;
  myArray[80] = 0;
  myArray[81] = 15;
  myArray[82] = 0;
  myArray[83] = 1;
  myArray[84] = 0;
  myArray[85] = 0;
  myArray[86] = 2;
  myArray[87] = 88;
  myArray[88] = 0;
  myArray[89] = 4;
  myArray[90] = 0;
  myArray[91] = 10;
  myArray[92] = 192;
  myArray[93] = 47;
  myArray[94] = 192;
  myArray[95] = 12;
  myArray[96] = 0;
  myArray[97] = 15;
  myArray[98] = 0;
  myArray[99] = 1;
  myArray[100] = 0;
  myArray[101] = 0;
  myArray[102] = 2;
  myArray[103] = 88;
  myArray[104] = 0;
  myArray[105] = 9;
  myArray[106] = 0;
  myArray[107] = 50;
  myArray[108] = 4;
  myArray[109] = 97;
  myArray[110] = 108;
  myArray[111] = 116;
  myArray[112] = 52;
  myArray[113] = 192;
  myArray[114] = 47;
  myArray[115] = 192;
  myArray[116] = 12;
  myArray[117] = 0;
  myArray[118] = 15;
  myArray[119] = 0;
  myArray[120] = 1;
  myArray[121] = 0;
  myArray[122] = 0;
  myArray[123] = 2;
  myArray[124] = 88;
  myArray[125] = 0;
  myArray[126] = 9;
  myArray[127] = 0;
  myArray[128] = 40;
  myArray[129] = 4;
  myArray[130] = 97;
  myArray[131] = 108;
  myArray[132] = 116;
  myArray[133] = 51;
  myArray[134] = 192;
  myArray[135] = 47;
}


function testGetNameFromReference() {
  var myLabelManager = new netdebugger.ResponseLabelPointerManager(myArray);
  assertEquals('google.com', myLabelManager.getNameFromReference(12));
  assertEquals('aspmx.l.google.com', myLabelManager.getNameFromReference(47));
}
