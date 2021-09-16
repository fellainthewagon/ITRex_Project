const { Resolution, Doctor } = require("../../../db");
const ApiError = require("../../../errors/apiError");

module.exports = class ResolutionStorage {
  async create(id, resolution, doctorId, ttl) {
    try {
      const timestamp = Date.now() + ttl * 1000;
      await Resolution.create({
        patient_id: id,
        resolution,
        doctor_id: doctorId,
        expire_timestamp: timestamp,
      });
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async findById(id) {
    try {
      const data = await Resolution.findAll({
        where: { patient_id: id },
        include: [
          {
            model: Doctor,
            as: "doctor",
            include: ["specialization"],
          },
        ],
        required: false,
        raw: true,
      });

      if (!data.length) return null;

      const resolutions = await Promise.all(
        data.filter(
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
