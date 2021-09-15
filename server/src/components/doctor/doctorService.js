const CatchError = require("../../errors/catchError");
const doctorStorage = require("../repositories/doctorStorage");
const DbError = require("../../errors/dbErrors");
const { NO_MATCHES } = require("../../constants");

class DoctorService {
  async getDoctorId(id) {
    try {
      const doctor = await doctorStorage.findById(id);
      if (!doctor) throw DbError.NoMatches(NO_MATCHES);
      return doctor;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getDoctorSpecializationByUserId(userId) {
    try {
      const doctor = await doctorStorage.findSpecialization(userId);
      if (!doctor) throw DbError.NoMatches(NO_MATCHES);
      return doctor;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
}

module.exports = new DoctorService();
