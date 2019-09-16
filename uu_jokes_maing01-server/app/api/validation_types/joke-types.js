/* eslint-disable */

const jokeCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  code: code().isRequired(),
  text: uu5String(4000),
});

const jokeGetDtoInType = shape({
  code: code().isRequired()
});