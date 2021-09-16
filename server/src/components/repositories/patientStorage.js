const { Op } = require("sequelize");
const { Patient } = require("../../db");

class PatientStorage {
  async findOrCreate({ name, dob, gender }, id) {
    await Patient.findOrCreate({
      where: { name },
      defaults: { user_id: id, dob, gender },
    });
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

  async findPatientById(user_id) {
    return Patient.findOne({ where: { user_id } });
  }
}

module.exports = new PatientStorage();
