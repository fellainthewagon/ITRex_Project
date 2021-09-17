const jwt = require("jsonwebtoken");
const { accessTokenTTL, accessSecret } = require("../../config");
const tokenService = require("../../src/components/token/tokenService");

/**
 * mocking funcs
 */
jwt.sign = jest.fn();
jwt.verify = jest.fn();

/**
 * vars
 */
const data = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
};
const token = "awdvhvaw8dgjwvw.jwhvduwa809skrn.aw9e3hkjaeb83";

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'TokenService' class", () => {
  it("'generateToken' method", () => {
    jwt.sign.mockReturnValue(token);

    expect(tokenService.generateToken(data)).toEqual(token);
    expect(jwt.sign).toHaveBeenCalledWith(data, accessSecret, {
      expiresIn: accessTokenTTL,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

  it("'verify' method", () => {
    jwt.verify.mockReturnValue(data);

    expect(tokenService.verify(token, accessSecret)).toEqual(data);
    expect(jwt.verify).toHaveBeenCalledWith(token, accessSecret);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });
});
