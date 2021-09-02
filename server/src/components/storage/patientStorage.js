const { Patient } = require("../../db");

class PatientStorage {
  constructor(model) {
    this.dbPatient = model;
  }

  // async findOne(userId) {
  //   try {
  //     return this.dbPatient.findOne({ where: { user_id: userId } });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async create(name, userId) {
    try {
      return this.dbPatient.create({ name, user_id: userId });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new PatientStorage(Patient);
