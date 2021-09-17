const tokenService = require("../components/token/tokenService");
const { accessSecret } = require("../../config");
const { TOKEN_REQUIRED } = require("../constants");
const UnauthorizedError = require("../errors/unauthorizedError");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    if (!accessToken) throw new UnauthorizedError(TOKEN_REQUIRED);

    const payload = tokenService.verify(
      accessToken.split(" ")[1],
      accessSecret
    );

    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
};
