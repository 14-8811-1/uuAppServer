const { TestHelper } = require("uu_appg01_workspace-test");

beforeAll(async () => {
  // fire up application
  await TestHelper.setup();
});

afterAll(() => {
  TestHelper.teardown();
});

describe("Joke uuCMD tests", () => {
  test("example 02 - hds", async () => {
    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny"
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.awid).toEqual(TestHelper.awid);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("example 02 - invalid dtoIn", async () => {
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("joke/create", {});
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/joke/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });
});
