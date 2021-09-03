const userService = require("./userService");

class UserController {
  constructor(service) {
    this.userService = service;
  }

  async getUser(req, res, next) {
    try {
      const data = await this.userService.getUser(req);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new UserController(userService);
