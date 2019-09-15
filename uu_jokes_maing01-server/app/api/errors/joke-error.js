const UuJokesError = require("./jokes-main-use-case-error.js");

const Create = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/create/`,

  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  Create
};
