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
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/get/`,
  JokeDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokeDoesNotExist`;
      this.message = "Joke does not exist.";
    }
  }
};

module.exports = {
  Create,
  Get
};
