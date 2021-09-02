const jwt = require("jsonwebtoken");
const { secret } = require("../../config");
const { TOKEN_REQUIRED, NOT_AUTH } = require("../constants/statusMessage");
const AuthException = require("../errors/authException");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"].replace(/^Bearer\s/, "");

    if (!token) {
      throw new AuthException(TOKEN_REQUIRED);
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
    } catch (err) {
      throw new AuthException(NOT_AUTH);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
