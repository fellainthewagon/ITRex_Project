const { Specialization } = require("../../db");

class SpecializationStorage {
  async findById(id) {
    const specialization = await Specialization.findOne({
      where: { doctor_id: id },
    });
    return specialization;
  }
}

module.exports = new SpecializationStorage();
