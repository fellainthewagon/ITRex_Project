const { Doctor, Specialization } = require("../../db");

class DoctorStorage {
  async findById(id) {
    return await Doctor.findOne({ where: { user_id: id } });
  }

  async findSpecialization(id) {
    return await Doctor.findOne({
      attributes: ["name", "id"],
      where: { user_id: id },
      include: {
        attributes: ["specialization"],
        model: Specialization,
        as: "specialization",
      },
    });
  }
}

module.exports = new DoctorStorage();
