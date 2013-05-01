// Copyright 2013. All Rights Reserved.

/**
 * @fileoverview Tests for DNSPacketDeserializer class.
 *
 * @author ebeach@google.com (Eric Beach)
 */

goog.provide('netdebugger.test.DNSPacketDeserializer');

goog.require('netdebugger.DNSPacketDeserializer');
goog.require('netdebugger.ResponseLabelPointerManager');
goog.require('goog.testing.jsunit');

goog.setTestOnly('Tests for netdebugger.DNSPacketDeserializer');


/**
 * Create objects for testing.
 */
function setUp() {
  // represent a DNS response packet as an array buffer
  var myArrayBuffer = new Uint8Array(124);
  myArrayBuffer[0] = 0;
  myArrayBuffer[1] = 0;
  myArrayBuffer[2] = 129;
  myArrayBuffer[3] = 128;
  myArrayBuffer[4] = 0;
  myArrayBuffer[5] = 1;
  myArrayBuffer[6] = 0;
  myArrayBuffer[7] = 6;
  myArrayBuffer[8] = 0;
  myArrayBuffer[9] = 0;
  myArrayBuffer[10] = 0;
  myArrayBuffer[11] = 0;
  myArrayBuffer[12] = 6;
  myArrayBuffer[13] = 103;
  myArrayBuffer[14] = 111;
  myArrayBuffer[15] = 111;
  myArrayBuffer[16] = 103;
  myArrayBuffer[17] = 108;
  myArrayBuffer[18] = 101;
  myArrayBuffer[19] = 3;
  myArrayBuffer[20] = 99;
  myArrayBuffer[21] = 111;
  myArrayBuffer[22] = 109;
  myArrayBuffer[23] = 0;
  myArrayBuffer[24] = 0;
  myArrayBuffer[25] = 1;
  myArrayBuffer[26] = 0;
  myArrayBuffer[27] = 1;
  myArrayBuffer[28] = 192;
  myArrayBuffer[29] = 12;
  myArrayBuffer[30] = 0;
  myArrayBuffer[31] = 1;
  myArrayBuffer[32] = 0;
  myArrayBuffer[33] = 1;
  myArrayBuffer[34] = 0;
  myArrayBuffer[35] = 0;
  myArrayBuffer[36] = 1;
  myArrayBuffer[37] = 11;
  myArrayBuffer[38] = 0;
  myArrayBuffer[39] = 4;
  myArrayBuffer[40] = 74;
  myArrayBuffer[41] = 125;
  myArrayBuffer[42] = 137;
  myArrayBuffer[43] = 101;
  myArrayBuffer[44] = 192;
  myArrayBuffer[45] = 12;
  myArrayBuffer[46] = 0;
  myArrayBuffer[47] = 1;
  myArrayBuffer[48] = 0;
  myArrayBuffer[49] = 1;
  myArrayBuffer[50] = 0;
  myArrayBuffer[51] = 0;
  myArrayBuffer[52] = 1;
  myArrayBuffer[53] = 11;
  myArrayBuffer[54] = 0;
  myArrayBuffer[55] = 4;
  myArrayBuffer[56] = 74;
  myArrayBuffer[57] = 125;
  myArrayBuffer[58] = 137;
  myArrayBuffer[59] = 100;
  myArrayBuffer[60] = 192;
  myArrayBuffer[61] = 12;
  myArrayBuffer[62] = 0;
  myArrayBuffer[63] = 1;
  myArrayBuffer[64] = 0;
  myArrayBuffer[65] = 1;
  myArrayBuffer[66] = 0;
  myArrayBuffer[67] = 0;
  myArrayBuffer[68] = 1;
  myArrayBuffer[69] = 11;
  myArrayBuffer[70] = 0;
  myArrayBuffer[71] = 4;
  myArrayBuffer[72] = 74;
  myArrayBuffer[73] = 125;
  myArrayBuffer[74] = 137;
  myArrayBuffer[75] = 102;
  myArrayBuffer[76] = 192;
  myArrayBuffer[77] = 12;
  myArrayBuffer[78] = 0;
  myArrayBuffer[79] = 1;
  myArrayBuffer[80] = 0;
  myArrayBuffer[81] = 1;
  myArrayBuffer[82] = 0;
  myArrayBuffer[83] = 0;
  myArrayBuffer[84] = 1;
  myArrayBuffer[85] = 11;
  myArrayBuffer[86] = 0;
  myArrayBuffer[87] = 4;
  myArrayBuffer[88] = 74;
  myArrayBuffer[89] = 125;
  myArrayBuffer[90] = 137;
  myArrayBuffer[91] = 113;
  myArrayBuffer[92] = 192;
  myArrayBuffer[93] = 12;
  myArrayBuffer[94] = 0;
  myArrayBuffer[95] = 1;
  myArrayBuffer[96] = 0;
  myArrayBuffer[97] = 1;
  myArrayBuffer[98] = 0;
  myArrayBuffer[99] = 0;
  myArrayBuffer[100] = 1;
  myArrayBuffer[101] = 11;
  myArrayBuffer[102] = 0;
  myArrayBuffer[103] = 4;
  myArrayBuffer[104] = 74;
  myArrayBuffer[105] = 125;
  myArrayBuffer[106] = 137;
  myArrayBuffer[107] = 138;
  myArrayBuffer[108] = 192;
  myArrayBuffer[109] = 12;
  myArrayBuffer[110] = 0;
  myArrayBuffer[111] = 1;
  myArrayBuffer[112] = 0;
  myArrayBuffer[113] = 1;
  myArrayBuffer[114] = 0;
  myArrayBuffer[115] = 0;
  myArrayBuffer[116] = 1;
  myArrayBuffer[117] = 11;
  myArrayBuffer[118] = 0;
  myArrayBuffer[119] = 4;
  myArrayBuffer[120] = 74;
  myArrayBuffer[121] = 125;
  myArrayBuffer[122] = 137;
  myArrayBuffer[123] = 139;

  myLabelPointerManager = new netdebugger.ResponseLabelPointerManager(myArrayBuffer);
  myDeserializer = new netdebugger.DNSPacketDeserializer(myArrayBuffer,
      myLabelPointerManager);
}


/**
 * Test the testDeserializePacket() method.
 */
function testDeserializePacket() {
  myDeserializer.deserializePacket();
  var myDnsPacket = myDeserializer.getDeserializedPacket();

  assertEquals(33152, myDnsPacket.getFlags());
  assertEquals(6, myDnsPacket.getAnswerRecordCount());

  function testDnsRecord(record) {
    assertEquals('google.com', record.getName());
    assertEquals(267, record.getTTL());
    assertEquals(netdebugger.DNSUtil.RecordNumber.A, record.getType());
  }

  myDnsPacket.eachRecord(netdebugger.DNSUtil.PacketSection.ANSWER, testDnsRecord);
}
