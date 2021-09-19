const CatchError = require("../../errors/catchError");
const specializationStorage = require("../repositories/specializationStorage");
const DbError = require("../../errors/dbErrors");
const { NO_MATCHES } = require("../../constants");

class SpecializationService {
  async getSpecializationByDoctorId(id) {
    try {
      const specialization = await specializationStorage.findById(id);
      if (!specialization) throw DbError.NoMatches(NO_MATCHES);
      return specialization;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
}

module.exports = new SpecializationService();
