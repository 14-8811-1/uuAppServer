"use strict";
const ImageAbl = require("../../abl/image-abl.js");

class JokeController {
  create(ucEnv) {
    return ImageAbl.create(ucEnv.uri.getAwid(), ucEnv.getDtoIn());
  }

  async get(ucEnv) {
    let dtoOut = await ImageAbl.get(ucEnv.uri.getAwid(), ucEnv.getDtoIn());
    return ucEnv.setBinaryDtoOut(dtoOut);
  }
}

module.exports = new JokeController();
