const CatchError = require("../../errors/catchError");
const doctorStorage = require("../repositories/doctorStorage");
const { DOCTOR_NOT_FOUND } = require("../../constants");
const NotFoundError = require("../../errors/notFoundError");

class DoctorService {
  async getDoctorData(userId) {
    try {
      const doctor = await doctorStorage.getDoctorByUserId(userId);
      if (!doctor) throw new NotFoundError(DOCTOR_NOT_FOUND);

      return doctor;
    } catch (error) {
      throw new CatchError(error.message, error.statusCode);
    }
  }
}

module.exports = new DoctorService();
