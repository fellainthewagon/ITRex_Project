const CatchError = require("../../errors/catchError");
const specializationStorage = require("../repositories/specializationStorage");

class SpecializationService {
  async getSpecializationByDoctorId(id) {
    try {
      const specialization = await specializationStorage.findById(id);
      if (!specialization) return null;
      return specialization;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
}

module.exports = new SpecializationService();
