const { Doctor, Specialization } = require("../../db");

class DoctorStorage {
  async findById(id) {
    const doctor = await Doctor.findOne({ where: { user_id: id } });
    return doctor;
  }

  async findSpecialization(id) {
    const doctor = await Doctor.findOne({
      attributes: ["name"],
      where: { user_id: id },
      include: {
        attributes: ["specialization"],
        model: Specialization,
        as: "specialization",
      },
    });
    return doctor;
  }
}

module.exports = new DoctorStorage();
