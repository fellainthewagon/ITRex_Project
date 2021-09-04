const tokenService = require("../components/token/tokenService");
const ApiError = require("../errors/apiError");
const { accessSecret } = require("../../config");
const { TOKEN_REQUIRED, NOT_AUTH } = require("../constants/statusMessage");

module.exports = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw ApiError.Unauthorized(TOKEN_REQUIRED);

    const { payload, expired } = tokenService.verify(accessToken, accessSecret);
    if (payload) {
      req.user = payload;
      return next();
    }

    // if "accessT" expired and we have "refreshT", generate NEW accessT if fefreshT is valid
    const { refreshToken } = req.cookies;

    if (expired && refreshToken) {
      const data = tokenService.generateNewAccessToken(refreshToken);
      if (!data) throw ApiError.Unauthorized(NOT_AUTH);

      res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      req.user = data.payload;
      return next();
    }

    throw ApiError.Unauthorized(NOT_AUTH);
  } catch (error) {
    return next(error);
  }
};
