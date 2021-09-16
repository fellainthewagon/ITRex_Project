const { User } = require("../../db");

class UserStorage {
  async create(email, password) {
    return User.create({ email, password, role: "patient" });
  }

  async findUserById(id) {
    return User.findByPk(id, { include: "patient", raw: true });
  }

  async findUserByEmail(email) {
    return User.findOne({
      where: { email },
      raw: true,
    });
  }
}

module.exports = new UserStorage();
