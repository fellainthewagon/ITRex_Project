const { User } = require("../../db");

class UserStorage {
  constructor(model) {
    this.dbUser = model;
  }

  async findById(id) {
    try {
      return (await this.dbUser.findByPk(id, { include: "patient" })).get({
        plain: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email) {
    try {
      return this.dbUser.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(email, password) {
    try {
      return this.dbUser.create({ email, password });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new UserStorage(User);
