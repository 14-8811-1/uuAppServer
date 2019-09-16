"use strict";
const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {
  create(ucEnv) {
    return JokeAbl.create(
      ucEnv.uri.getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getAuthorizationResult(),
      ucEnv.getSession().getIdentity()
    );
  }

  get(ucEnv) {
    return JokeAbl.get(ucEnv.uri.getAwid(), ucEnv.getDtoIn());
  }

  setActive(ucEnv) {
    return JokeAbl.setActive(ucEnv.uri.getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new JokeController();
