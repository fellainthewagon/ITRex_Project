const { Specialization, Doctor } = require("../../db");

class SpecializationStorage {
  async findById(id) {
    return await Doctor.findOne({
      where: { id },
      include: {
        attributes: ["specialization"],
        model: Specialization,
        as: "specialization",
      },
    });
  }
}

module.exports = new SpecializationStorage();
