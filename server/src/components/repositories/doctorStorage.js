const { Doctor } = require("../../db");

class DoctorStorage {
  async findById(id) {
    const doctor = await Doctor.findOne({ where: { user_id: id } });
    return doctor;
  }
}

module.exports = new DoctorStorage();
