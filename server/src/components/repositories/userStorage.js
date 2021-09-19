const { User } = require("../../db");

class UserStorage {
  async create(email, password) {
<<<<<<< HEAD
    return await User.create({ email, password, role: "patient" });
=======
    return User.create({ email, password });
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
  }

  async findByPk(id) {
    return (await User.findByPk(id, { include: "patient" }))?.get({
      plain: true,
    });
  }

  async findOne(email) {
<<<<<<< HEAD
    return await User.findOne({ where: { email }, raw: true });
=======
    return User.findOne({ where: { email }, raw: true });
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
  }
}

module.exports = new UserStorage();
