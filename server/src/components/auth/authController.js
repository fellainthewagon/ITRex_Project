const {
  accessTokenName,
  refreshTokenName,
  maxAgeRefresh,
  maxAgeAccess,
} = require("../../../config");
const authService = require("./authService");

class AuthController {
  constructor(service) {
    this.authService = service;
  }

  async register(req, res, next) {
    try {
      const user = await this.authService.registration(req.body);

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      const data = await this.authService.login(req.body);

      res.cookie(refreshTokenName, data.refreshToken, {
        httpOnly: true,
        maxAge: maxAgeRefresh,
      });
      res.cookie(accessTokenName, data.accessToken, {
        httpOnly: true,
        maxAge: maxAgeAccess,
      });

      return res.json(data.user);
    } catch (error) {
      return next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const fakeToken = await this.authService.logout();
      res.clearCookie(refreshTokenName);
      res.clearCookie(accessTokenName);

      return res.json({ token: fakeToken });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AuthController(authService);
