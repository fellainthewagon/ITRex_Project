const { Doctor, Specialization } = require("../../db");

class DoctorStorage {
  async getDoctorByUserId(id) {
    return Doctor.findOne({
      where: { user_id: id },
      attributes: ["name", "id"],
      include: {
        attributes: ["specialization"],
        model: Specialization,
        as: "specialization",
      },
    });
  }
}

module.exports = new DoctorStorage();
