"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/joke-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
  }

  async create(awid, dtoIn) {
    console.log(Errors);
    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new JokeAbl();
