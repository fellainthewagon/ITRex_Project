const { Patient } = require("../../db");

class PatientStorage {
  async findOrCreate(name, user) {
    await Patient.findOrCreate({
      where: { name },
      defaults: { user_id: user.id },
    });
  }

  async findOne(name) {
    return Patient.findOne({ where: { name } });
  }
}

module.exports = new PatientStorage();
