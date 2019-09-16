"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/joke-error.js");
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
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

    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Create.JokeDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new JokeAbl();
