const { Patient } = require("../../db");

class PatientStorage {
  async findOrCreate({ name, dob, gender }, id) {
    await Patient.findOrCreate({
      where: { name },
      defaults: { user_id: id, dob, gender },
    });
  }

  async findPatientByName(name) {
    return await Patient.findOne({ where: { name } });
  }

  async findPatientById(user_id) {
    return await Patient.findOne({ where: { user_id } });
  }
}

module.exports = new PatientStorage();
