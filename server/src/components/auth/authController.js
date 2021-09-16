const authService = require("./authService");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.registration(req.body);

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      const data = await authService.login(req.body);
      console.log(data);
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return res.send();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AuthController();
