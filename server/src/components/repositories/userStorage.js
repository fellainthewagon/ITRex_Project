const { User } = require("../../db");

class UserStorage {
  async create(email, password) {
    return await User.create({ email, password, role: "patient" });
  }

  async findByPk(id) {
    return (await User.findByPk(id, { include: "patient" }))?.get({
      plain: true,
    });
  }

  async findOne(email) {
    return await User.findOne({ where: { email }, raw: true });
  }
}

module.exports = new UserStorage();
