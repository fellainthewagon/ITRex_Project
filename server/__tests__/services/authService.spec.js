const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../../src/components/auth/authService");
const userService = require("../../src/components/user/userService");
const { User, Patient } = require("../../src/db");
const UserDto = require("../../src/dtos/userDto");
const CatchError = require("../../src/errors/catchError");
const { secret, expiresIn } = require("../../config");

/**
 * mocking funcs
 */
User.create = jest.fn();
Patient.create = jest.fn();
userService.checkCredentialAndGetUser = jest.fn();
bcrypt.hash = jest.fn();
jwt.sign = jest.fn();

/**
 * vars
 */
const registerData = { name: "mia", email: "mia@mail.ru", password: "123123" };
const reqBody = { email: "mia@mail.ru", password: "123123" };
const user = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
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
    User.create.mockResolvedValue(user);

    expect(await authService.registration(registerData)).toEqual({
      ...userDto,
    });
    expect(User.create).toHaveBeenCalledWith({
      email,
      password: hashedPassword,
    });
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(Patient.create).toHaveBeenCalledWith({ name, user_id: user.id });
    expect(Patient.create).toHaveBeenCalledTimes(1);

    await catchBlockTest("create", authService.registration, User);
  });

  it("'login' method", async () => {
    userService.checkCredentialAndGetUser.mockResolvedValue(user);
    jwt.sign.mockReturnValue("access token");

    expect(await authService.login(reqBody)).toEqual({
      user: { ...userDto },
      token: "access token",
    });
    expect(userService.checkCredentialAndGetUser).toHaveBeenCalledWith(reqBody);
    expect(userService.checkCredentialAndGetUser).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ ...userDto }, secret, {
      expiresIn,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);

    await catchBlockTest(
      "checkCredentialAndGetUser",
      authService.login,
      userService
    );
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
