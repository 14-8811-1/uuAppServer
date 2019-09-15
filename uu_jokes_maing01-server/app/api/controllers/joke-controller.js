"use strict";
class JokeController {
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let dtoOut = {
      awid,
      joke: dtoIn.joke,
      uuAppErrorMap: {}
    };

    return dtoOut;
  }
}

module.exports = new JokeController();
