const { TestHelper } = require("uu_appg01_workspace-test");

beforeAll(async () => {
  // fire up application
  await TestHelper.setup();
});

afterAll(() => {
  TestHelper.teardown();
});

describe("Joke uuCMD tests", () => {
  test("example 3 test - joke/create", async () => {
    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny"
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn, undefined, undefined, TestHelper.getAsid());

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.uuAppErrorMap).toEqual({});
  });
});
