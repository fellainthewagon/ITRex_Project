const authService = require("./authService");

class AuthController {
  constructor(service) {
    this.authService = service;
  }

  async getUser(req, res, next) {
    try {
      const data = await this.authService.getUser(req);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
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
      const token = await this.authService.login(req.body.userId);
      // res.setHeader("x-access-token", token);
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }

  async logout(req, res, next) {}
}

module.exports = new AuthController(authService);
