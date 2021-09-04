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
      const user = await this.authService.login(req.body);

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const fakeToken = await this.authService.logout();
      res.clearCookie("refreshToken");

      return res.json({ token: fakeToken });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AuthController(authService);
