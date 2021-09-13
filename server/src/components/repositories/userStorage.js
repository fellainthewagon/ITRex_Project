const { User } = require("../../db");

class UserStorage {
  async create(email, password) {
    const user = await User.create({ email, password, role: "patient" });
    return user;
  }

  async findByPk(id) {
    return (await User.findByPk(id, { include: "patient" }))?.get({
      plain: true,
    });
  }

  async findOne(email) {
    const user = await User.findOne({ where: { email }, raw: true });
    return user;
  }
}

module.exports = new UserStorage();
