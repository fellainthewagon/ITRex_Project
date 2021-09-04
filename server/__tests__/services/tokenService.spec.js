const jwt = require("jsonwebtoken");
const {
  accessTokenTTL,
  refreshSecret,
  refreshTokenTTL,
  accessSecret,
} = require("../../config");
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

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'TokenService' class", () => {
  it("'generateTokens' method", () => {
    jwt.sign.mockReturnValueOnce("refresh token");
    jwt.sign.mockReturnValueOnce("access token");

    expect(tokenService.generateTokens(data)).toEqual({
      refreshToken: "refresh token",
      accessToken: "access token",
    });

    expect(jwt.sign).toHaveBeenNthCalledWith(1, data, refreshSecret, {
      expiresIn: refreshTokenTTL,
    });
    expect(jwt.sign).toHaveBeenNthCalledWith(2, data, accessSecret, {
      expiresIn: accessTokenTTL,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(2);
  });

  it("'verify' method, if 'token' is ok", () => {
    jwt.verify.mockReturnValue(data);

    expect(tokenService.verify("token", "tokenSecret")).toEqual({
      payload: data,
      expired: false,
    });

    expect(jwt.verify).toHaveBeenCalledWith("token", "tokenSecret");
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });

  it("'verify' method, if 'token' is not valid", () => {
    const error = new Error();
    jwt.verify.mockImplementation(() => {
      throw error;
    });

    expect(tokenService.verify("token", "tokenSecret")).toEqual({
      payload: null,
      expired: error.message === "jwt expired",
    });

    expect(jwt.verify).toHaveBeenCalledWith("token", "tokenSecret");
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });

  it("'generateNewAccessToken' method, if 'refreshToken' is valid", () => {
    tokenService.verify = jest.fn();
    tokenService.verify.mockReturnValueOnce({ payload: data });
    jwt.sign.mockReturnValueOnce("access token");

    expect(tokenService.generateNewAccessToken("refresh token")).toEqual({
      payload: data,
      accessToken: "access token",
    });
    expect(tokenService.verify).toHaveBeenCalledWith(
      "refresh token",
      refreshSecret
    );
    expect(tokenService.verify).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith(data, accessSecret, {
      expiresIn: accessTokenTTL,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

  it("'generateNewAccessToken' method, if 'refreshToken' is not valid", () => {
    tokenService.verify.mockReturnValueOnce({ payload: null });
    expect(tokenService.generateNewAccessToken("refresh token")).toBeNull();
  });
});
