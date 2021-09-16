const { Specialization } = require("../../db");

class SpecializationStorage {
  async findById(id) {
    return Specialization.findOne({
      where: { doctor_id: id },
    });
  }
}

module.exports = new SpecializationStorage();
