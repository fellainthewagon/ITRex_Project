const userService = require("./userService");

class UserController {
  async getUser(req, res, next) {
    try {
      const data = await userService.getUser(req.user.id);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new UserController();
