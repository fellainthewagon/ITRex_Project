const tokenService = require("../components/token/tokenService");
const ApiError = require("../errors/apiError");
const { accessSecret } = require("../../config");
const { TOKEN_REQUIRED, NOT_AUTH } = require("../constants/statusMessage");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"]?.replace(/^Bearer\s/, "");
    if (!accessToken) throw ApiError.Unauthorized(TOKEN_REQUIRED);

    const { payload } = tokenService.verify(accessToken, accessSecret);
    if (payload) {
      req.user = payload;
      return next();
    }

    throw ApiError.Unauthorized(NOT_AUTH);
  } catch (error) {
    return next(error);
  }
};

// const { refreshToken } = req.cookies;

// if (expired && refreshToken) {
//   const data = tokenService.generateNewAccessToken(refreshToken);
//   if (!data) throw ApiError.Unauthorized(NOT_AUTH);

//   res.setHeader("x-access-token", data.accessToken);
//   req.user = data.payload;
//   return next();
// }
