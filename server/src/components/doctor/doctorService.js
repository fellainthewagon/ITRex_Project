const CatchError = require("../../errors/catchError");
const doctorStorage = require("../repositories/doctorStorage");

class DoctorService {
  async getDoctorId(id) {
    try {
      const doctor = await doctorStorage.findById(id);
      if (!doctor) return null;
      return doctor;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getDoctorSpecialization(id) {
    try {
      const doctor = await doctorStorage.findSpecialization(id);
      if (!doctor) return null;
      return doctor;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
}

module.exports = new DoctorService();
