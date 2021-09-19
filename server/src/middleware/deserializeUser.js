const tokenService = require("../components/token/tokenService");
const { accessSecret } = require("../../config");
const { TOKEN_REQUIRED, TOKEN_EXPIRED, EXPIRED_TYPE } = require("../constants");
const UnauthorizedError = require("../errors/unauthorizedError");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw new UnauthorizedError(TOKEN_REQUIRED);

    const payload = tokenService.verify(
      accessToken.split(" ")[1],
      accessSecret
    );

    req.user = payload;
    return next();
  } catch (error) {
    if (error.name === EXPIRED_TYPE) {
      throw new UnauthorizedError(TOKEN_EXPIRED);
    }
    return next(error);
  }
};
