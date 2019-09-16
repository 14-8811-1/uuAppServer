"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/joke-error.js");
const { DaoFactory, ObjectStoreError, DuplicateKey } = require("uu_appg01_server").ObjectStore;

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  setActiveUnsupportedKeys: {
    code: `${Errors.SetActive.UC_CODE}unsupportedKeys`
  }
};

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create(awid, dtoIn, authorizationResult, identity) {
    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    if (authorizationResult.getAuthorizedProfiles().includes("Authorities")) {
      dtoIn.state = "active";
    } else {
      dtoIn.state = "pending";
    }

    dtoIn.author = identity.getName();
    dtoIn.uuIdentity = identity.getUuIdentity();
    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        if (e instanceof DuplicateKey) {
          throw new Errors.Create.JokeNotUnique({ uuAppErrorMap }, { code: dtoIn.code });
        } else {
          throw new Errors.Create.JokeDaoCreateFailed({ uuAppErrorMap }, e);
        }
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let joke = await this.dao.get(awid, dtoIn.code);
    if (!joke) {
      throw new Errors.Get.JokeDoesNotExist(uuAppErrorMap, { code: dtoIn.code });
    }

    joke.uuAppErrorMap = uuAppErrorMap;
    return joke;
  }

  async setActive(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeSetActiveDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.setActiveUnsupportedKeys.code,
      Errors.SetActive.InvalidDtoIn
    );

    let joke;
    try {
      joke = await this.dao.setActive(awid, dtoIn.code);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SetActive.SetStateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    joke.uuAppErrorMap = uuAppErrorMap;
    return joke;
  }
}

module.exports = new JokeAbl();
