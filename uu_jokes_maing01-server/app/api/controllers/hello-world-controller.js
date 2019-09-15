"use strict";

class HelloWorldController {
  helloWorld(ucEnv) {
    const dtoOut = {
      text: "Hello world!",
      uuAppErrorMap: {}
    };
    return dtoOut;
  }
}

module.exports = new HelloWorldController();
