const userStorage = require("../../src/components/repositories/userStorage");
const userService = require("../../src/components/user/userService");
const { USER_NOT_FOUND, WRONG_CREDENTIALS } = require("../../src/constants");
const ProfileDto = require("../../src/dtos/profileDto");
const bcrypt = require("bcryptjs");

/**
 * mocking funcs
 */
userStorage.findUserById = jest.fn();
userStorage.findUserByEmail = jest.fn();
bcrypt.compare = jest.fn();

/**
 * vars
 */
const userPatient = {
  id: "9627aeb0-17e7-11ec-8a8a-95895ec7e17f",
  email: "user@mail.ru",
  password: "$2a$10$6CT6ND2YjufucVfG/9co1eI8i13WPCEYsy1uM.f1U0fHUgwagP1uW",
  role: "patient",
  createdAt: "2021-09-17T18:46:36.000Z",
  updatedAt: "2021-09-17T18:46:36.000Z",
  "patient.id": 3,
  "patient.user_id": "9627aeb0-17e7-11ec-8a8a-95895ec7e17f",
  "patient.name": "user user",
  "patient.dob": "2020-02-20T00:00:00.000Z",
  "patient.gender": "male",
  "patient.createdAt": "2021-09-17T18:46:36.000Z",
  "patient.updatedAt": "2021-09-17T18:46:36.000Z",
};
const { id } = userPatient;
const profileDto = new ProfileDto(userPatient);
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
    userStorage.findUserById.mockResolvedValue(userPatient);

    expect(await userService.getUser(id)).toEqual({ ...profileDto });
    expect(userStorage.findUserById).toHaveBeenCalledWith(id);
    expect(userStorage.findUserById).toHaveBeenCalledTimes(1);

    await catchBlockTest("findUserById", userService.getUser);
  });

  it("'getUser' method, if 'user' doesn't exist", async () => {
    userStorage.findUserById.mockResolvedValue(null);
    await expect(userService.getUser(id)).rejects.toThrowError(USER_NOT_FOUND);
  });

  it("'checkCredential' method, if 'user' exist and 'password' is valid", async () => {
    userStorage.findUserByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);

    expect(await userService.checkCredential(reqBody)).toEqual(user);
    expect(userStorage.findUserByEmail).toHaveBeenCalledWith(reqBody.email);
    expect(userStorage.findUserByEmail).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);

    await catchBlockTest("findUserByEmail", userService.checkCredential);
  });

  it("'checkCredential' method, if 'user' doesn't exist or invalid 'password'", async () => {
    userStorage.findUserByEmail.mockResolvedValue(null);

    await expect(userService.checkCredential(reqBody)).rejects.toThrowError(
      WRONG_CREDENTIALS
    );
    expect(bcrypt.compare).toHaveBeenCalledTimes(0);

    userStorage.findUserByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);
    await expect(userService.checkCredential(reqBody)).rejects.toThrowError(
      WRONG_CREDENTIALS
    );
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
  });
});
