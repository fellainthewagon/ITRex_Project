const tokenService = require("../components/token/tokenService");
const ApiError = require("../errors/apiError");
const { accessSecret } = require("../../config");
const { TOKEN_REQUIRED, NOT_AUTH } = require("../constants");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    if (!accessToken) throw ApiError.Unauthorized(TOKEN_REQUIRED);

    const payload = tokenService.verify(
      accessToken.split(" ")[1],
      accessSecret
    );

    req.user = payload;
    return next();
  } catch (error) {
    return next(ApiError.Unauthorized(NOT_AUTH));
  }
};
