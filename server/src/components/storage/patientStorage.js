const { Patient } = require("../../db");

class PatientStorage {
  async findOrCreate(name, id) {
    await Patient.findOrCreate({
      where: { name },
      defaults: { user_id: id },
    });
  }

  async findOne(name) {
    return Patient.findOne({ where: { name } });
  }
}

module.exports = new PatientStorage();
