const patientStorage = require("../repositories/patientStorage");
const CatchError = require("../../errors/catchError");
const ApiError = require("../../errors/apiError");
const { PATIENT_NOT_FOUND, RESOLUTION_NOT_FOUND } = require("../../constants");

module.exports = class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(patientId, resolution, ttl, specialization, doctor_name) {
    try {
      await this.storage.create(
        patientId,
        resolution,
        ttl,
        specialization,
        doctor_name
      );
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getPatientResolutions(name) {
    try {
      const patients = await patientStorage.getPatientsByName(name);

      if (!patients) throw ApiError.NotFound(PATIENT_NOT_FOUND);
      if (patients.length > 1) return { patients };

      const resolutions = await this.storage.findById(patients[0].id);
      if (!resolutions) throw ApiError.NotFound(RESOLUTION_NOT_FOUND);

      return { resolutions };
    } catch (error) {
      throw new CatchError(error.message, error.statusCode);
    }
  }

  async delete(patientId, doctorName) {
    try {
      const isDeleted = await this.storage.deleteByIdAndDoctorName(
        patientId,
        doctorName
      );

      return isDeleted || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
};
