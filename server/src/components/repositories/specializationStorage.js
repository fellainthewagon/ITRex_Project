const { Specialization } = require("../../db");

class SpecializationStorage {
  async findById(id) {
    return await Specialization.findOne({
      where: { doctor_id: id },
    });
  }
}

module.exports = new SpecializationStorage();
