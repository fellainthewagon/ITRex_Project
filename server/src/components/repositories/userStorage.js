const { User } = require("../../db");

class UserStorage {
  async create(email, password) {
    return User.create({ email, password });
  }

  async findByPk(id) {
    return (await User.findByPk(id, { include: "patient" }))?.get({
      plain: true,
    });
  }

  async findOne(email) {
    return User.findOne({ where: { email }, raw: true });
  }
}

module.exports = new UserStorage();
