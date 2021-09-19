const { Resolution, Doctor, Specialization } = require("../../../db");
const ApiError = require("../../../errors/apiError");

module.exports = class ResolutionStorage {
  async create(id, resolution, ttl, doctor_id) {
    try {
      const timestamp = Date.now() + ttl * 1000;
      await Resolution.create({
        patient_id: id,
        resolution,
        expire_timestamp: timestamp,
        doctor_id,
      });
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async findById(id) {
    try {
      const resolutionArr = await Resolution.findAll({
        where: { patient_id: id },
        include: {
          model: Doctor,
          as: "doctor",
          include: {
            model: Specialization,
            as: "specialization",
          },
        },
      });
      if (!resolutionArr) return null;
      const resolutions = await Promise.all(
        resolutionArr.map(async (resolution) => {
          if (resolution.expire_timestamp < Date.now()) {
            return null;
          }
          return resolution;
        })
      );
      return resolutions;
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async deleteByIdAndDoctorName(patientId, doctorId) {
    try {
      return await Resolution.destroy({
        where: { doctor_id: doctorId, patient_id: patientId },
      });
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }
};
