"use strict";
const UuBinaryAbl = require("uu_appg01_binarystore-cmd").UuBinaryModel;

class ImageAbl {
  async create(awid, dtoIn) {
    return UuBinaryAbl.createBinary(awid, { data: dtoIn.data, code: dtoIn.code });
  }

  async get(awid, dtoIn) {
    return UuBinaryAbl.getBinaryData(awid, { code: dtoIn.code });
  }
}

module.exports = new ImageAbl();
