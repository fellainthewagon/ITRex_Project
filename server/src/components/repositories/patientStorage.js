const { Op } = require("sequelize");
const { Patient } = require("../../db");

class PatientStorage {
  async create({ name, dob, gender }, id) {
    await Patient.create({ name, user_id: id, dob, gender });
  }

  async getPatientsByName(name) {
    const patients = await Patient.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      raw: true,
    });

    return patients.length ? patients : null;
  }

  async findPatientById(userId) {
    return Patient.findOne({ where: { user_id: userId } });
  }

  async findPatientByName(name) {
    return Patient.findOne({ where: { name }, raw: true });
  }
}

module.exports = new PatientStorage();
