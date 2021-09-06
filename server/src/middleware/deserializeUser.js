const tokenService = require("../components/token/tokenService");
const ApiError = require("../errors/apiError");
const { accessSecret, accessTokenName, maxAgeAccess } = require("../../config");
const { TOKEN_REQUIRED, NOT_AUTH } = require("../constants");

module.exports = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw ApiError.Unauthorized(TOKEN_REQUIRED);

    const { payload, error } = tokenService.verify(accessToken, accessSecret);
    if (payload) {
      req.user = payload;
      return next();
    }

    // if "accessT" expired and we have "refreshT", generate NEW accessT if fefreshT is valid
    const { refreshToken } = req.cookies;

    if (error === "TokenExpiredError" && refreshToken) {
      const data = tokenService.generateNewAccessToken(refreshToken);
      if (!data) throw ApiError.Unauthorized(NOT_AUTH);

      res.cookie(accessTokenName, data.accessToken, {
        httpOnly: true,
        maxAge: maxAgeAccess,
      });

      req.user = data.payload;
      return next();
    }

    throw ApiError.Unauthorized(NOT_AUTH);
  } catch (error) {
    return next(error);
  }
};
