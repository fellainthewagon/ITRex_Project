const { Patient } = require("../../db");

class PatientStorage {
  async findOrCreate({ name, dob, gender }, id) {
    await Patient.findOrCreate({
      where: { name },
      defaults: { user_id: id, dob, gender },
    });
  }

  async findOne(name) {
    return Patient.findOne({ where: { name } });
  }
}

module.exports = new PatientStorage();
