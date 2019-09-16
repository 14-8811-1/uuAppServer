const UuJokesError = require("./jokes-main-use-case-error.js");

const Create = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/create/`,

  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Create joke by joke Dao create failed.";
    }
  },
  JokeNotUnique: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeNotUnique`;
      this.message = "Joke code is not unique.";
    }
  }
};

const Get = {
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/get/`,
  JokeDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokeDoesNotExist`;
      this.message = "Joke does not exist.";
    }
  }
};

const SetActive = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/get/`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${SetActive.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SetStateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${SetActive.UC_CODE}setStateFailed`;
      this.message = "Set state failed.";
    }
  }
};

module.exports = {
  Create,
  Get,
  SetActive
};
