"use strict";
const JokesMainAbl = require("../../abl/jokes-main-abl.js");

class JokesMainController {
  init(ucEnv) {
    return JokesMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new JokesMainController();
