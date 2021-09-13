const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../../src/components/auth/authService");
const userService = require("../../src/components/user/userService");
const UserDto = require("../../src/dtos/userDto");
const tokenService = require("../../src/components/token/tokenService");
const userStorage = require("../../src/components/repositories/userStorage");
const patientStorage = require("../../src/components/repositories/patientStorage");

/**
 * mocking funcs
 */
userStorage.create = jest.fn();
patientStorage.findOrCreate = jest.fn();
userService.checkCredential = jest.fn();
bcrypt.hash = jest.fn();
tokenService.generateTokens = jest.fn();
jwt.sign = jest.fn();

/**
 * vars
 */
const registerData = { name: "mia", email: "mia@mail.ru", password: "123123" };
const reqBody = { email: "mia@mail.ru", password: "123123" };
const user = {
  user_id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
  password: "hashed ajhdi password",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
};
const hashedPassword = "hashed ajhdi password";
const { name, email, password } = registerData;
const userDto = new UserDto(user);

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn, rootFn) {
  jest.spyOn(rootFn, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  rootFn[method].mockRestore();
}

/**
 * TEST
 */
describe("'AuthService' class", () => {
  it("'registration' method", async () => {
    bcrypt.hash.mockResolvedValue(hashedPassword);
    userStorage.create.mockResolvedValue(user);

    expect(await authService.registration(registerData)).toEqual({
      ...userDto,
    });
    expect(userStorage.create).toHaveBeenCalledWith(email, hashedPassword);
    expect(userStorage.create).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(patientStorage.findOrCreate).toHaveBeenCalledWith(
      registerData,
      user.user_id
    );
    expect(patientStorage.findOrCreate).toHaveBeenCalledTimes(1);

    await catchBlockTest("create", authService.registration, userStorage);
  });

  it("'login' method", async () => {
    userService.checkCredential.mockResolvedValue(user);
    tokenService.generateTokens.mockReturnValue({
      accessToken: "access token",
      refreshToken: "refresh token",
    });

    expect(await authService.login(reqBody)).toEqual({
      user: { ...userDto },
      accessToken: "access token",
      refreshToken: "refresh token",
    });
    expect(userService.checkCredential).toHaveBeenCalledWith(reqBody);
    expect(userService.checkCredential).toHaveBeenCalledTimes(1);
    expect(tokenService.generateTokens).toHaveBeenCalledWith({ ...userDto });
    expect(tokenService.generateTokens).toHaveBeenCalledTimes(1);

    await catchBlockTest("checkCredential", authService.login, userService);
  });

  it("'logout' method", async () => {
    jwt.sign.mockReturnValue("fake access token with ttl = 1s");

    expect(await authService.logout()).toBe("fake access token with ttl = 1s");
    expect(jwt.sign).toHaveBeenCalledWith({}, "fake secret", {
      expiresIn: "1s",
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);

    await catchBlockTest("sign", authService.logout, jwt);
  });
});
