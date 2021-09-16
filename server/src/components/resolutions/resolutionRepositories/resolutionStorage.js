const { Resolution } = require("../../../db");
const ApiError = require("../../../errors/apiError");

module.exports = class ResolutionStorage {
  async create(id, resolution, ttl, specialization, doctor_name) {
    try {
      const timestamp = Date.now() + ttl * 1000;
      await Resolution.create({
        patient_id: id,
        resolution,
        expire_timestamp: timestamp,
        doctor_name,
        specialization,
      });
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async findById(id) {
    try {
      const resolutionArr = await Resolution.findAll({
        where: { patient_id: id },
        raw: true,
      });
      if (!resolutionArr.length) return null;

      const resolutions = await Promise.all(
        resolutionArr.filter(
          async (resolution) => resolution.expire_timestamp >= Date.now()
        )
      );
      return resolutions;
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async deleteByIdAndDoctorName(patientId, doctorName) {
    try {
      return Resolution.destroy({
        where: { doctor_name: doctorName, patient_id: patientId },
      });
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }
};
