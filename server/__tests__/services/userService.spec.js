const userStorage = require("../../src/components/repositories/userStorage");
const userService = require("../../src/components/user/userService");
const { USER_NO_EXIST, WRONG_PASSWORD } = require("../../src/constants");
const ProfileDto = require("../../src/dtos/profileDto");
const CatchError = require("../../src/errors/catchError");

/**
 * mocking funcs
 */
userStorage.findByPk = jest.fn();
userStorage.findOne = jest.fn();

/**
 * vars
 */
const userPatient = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
  password: "$2a$10$b626iZTDFvDRshqi2lcDa.KuZrJzNysn2eIhvKcjmu/LFWDFkqjsS",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
  patient: {
    id: 1,
    user_id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
    name: "mia",
    dob: "1972-01-09T00:00:00.000Z",
    gender: "female",
    createdAt: "2021-09-03T01:54:41.000Z",
    updatedAt: "2021-09-03T01:54:41.000Z",
  },
};
const { patient, id } = userPatient;
const profileDto = new ProfileDto(patient, userPatient);
const reqBody = {
  email: "mia@mail.ru",
  password: "123123",
  dob: "1972-01-09T00:00:00.000Z",
  gender: "female",
  name: "mia",
};
const user = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
  password: "$2a$10$b626iZTDFvDRshqi2lcDa.KuZrJzNysn2eIhvKcjmu/LFWDFkqjsS",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
};

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(userStorage, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  userStorage[method].mockRestore();
}

/**
 * TEST
 */
describe("'UserService' class", () => {
  it("'getUser' method, if 'user' is exist", async () => {
    userStorage.findByPk.mockResolvedValue(userPatient);

    expect(await userService.getUser(id)).toEqual({ ...profileDto });
    expect(userStorage.findByPk).toHaveBeenCalledWith(id);
    expect(userStorage.findByPk).toHaveBeenCalledTimes(1);

    await catchBlockTest("findByPk", userService.getUser);
  });

  it("'getUser' method, if 'user' doesn't exist", async () => {
    userStorage.findByPk.mockResolvedValue(null);
    expect(await userService.getUser(id)).toBeNull();
  });

  it("'checkCredential' method, if 'user' exist and 'password' is valid", async () => {
    userStorage.findOne.mockResolvedValue(user);

    expect(await userService.checkCredential(reqBody)).toEqual(user);
    expect(userStorage.findOne).toHaveBeenCalledWith(reqBody.email);
    expect(userStorage.findOne).toHaveBeenCalledTimes(1);

    await catchBlockTest("findOne", userService.checkCredential);
  });

  it("'checkCredential' method, if 'user' doesn't exist or invalid 'password'", async () => {
    userStorage.findOne.mockResolvedValue(null);
    await expect(userService.checkCredential(reqBody)).rejects.toThrowError(
      USER_NO_EXIST
    );

    userStorage.findOne.mockResolvedValue(user);
    user.password = "invalid password";
    await expect(userService.checkCredential(reqBody)).rejects.toThrowError(
      WRONG_PASSWORD
    );
    await expect(userService.checkCredential(reqBody)).rejects.toThrowError(
      CatchError
    );
  });
});
