const { TestHelper } = require("uu_appg01_workspace-test");

beforeAll(async () => {
  // fire up application
  await TestHelper.setup();
  await TestHelper.initApp();
  await TestHelper.initAppWorkspace();
  await TestHelper.executePostCommand("init", { authoritiesUri: "urn:uu:GGPLUS4U" });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Joke uuCMD tests", () => {
  test("example 8 test - joke/create", async () => {
    expect.assertions(5);

    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
      code: "ABC"
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.code).toEqual(dtoIn.code);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.uuAppErrorMap).toEqual({});

    try {
      await TestHelper.executePostCommand("joke/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/joke/create/jokeNotUnique");
    }
  });

  test("example 8 test - joke/get", async () => {
    expect.assertions(4);

    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
      code: "BCA"
    };
    await TestHelper.executePostCommand("joke/create", dtoIn);
    let result = await TestHelper.executeGetCommand("joke/get", { code: dtoIn.code });
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.uuAppErrorMap).toEqual({});

    try {
      await TestHelper.executeGetCommand("joke/get", { code: "AAA" });
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/joke/get/jokeDoesNotExist");
    }
  });

  test("example 12 test - joke/create + setActive", async () => {
    expect.assertions(10);

    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
      code: "BCAAA"
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.uuAppErrorMap).toEqual({});

    expect(result.data.state).toEqual("pending");
    expect(result.data.author).toEqual("User Anonymous");
    expect(result.data.uuIdentity).toEqual("0-0");

    let session = await TestHelper.login("AwidOwner");

    dtoIn.code = "BQA";
    result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.state).toEqual("active");
    expect(result.data.author).toEqual("Holly Hudson");
    expect(result.data.uuIdentity).toEqual("14-2710-1");

    result = await TestHelper.executePostCommand("joke/setActive", { code: "BCAAA" });
    expect(result.data.state).toEqual("active");
  });
});
