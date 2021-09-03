const jwt = require("jsonwebtoken");
const { secret } = require("../../config");
const { TOKEN_REQUIRED, NOT_AUTH } = require("../constants/statusMessage");
const ApiError = require("../errors/apiError");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"].replace(/^Bearer\s/, "");

    if (!token) {
      throw ApiError.Unauthorized(TOKEN_REQUIRED);
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
    } catch (err) {
      throw ApiError.Unauthorized(NOT_AUTH);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
