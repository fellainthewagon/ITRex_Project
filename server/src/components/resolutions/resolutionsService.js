const patientStorage = require("../repositories/patientStorage");
const CatchError = require("../../errors/catchError");
const { PATIENT_NOT_FOUND, RESOLUTION_NOT_FOUND } = require("../../constants");
const NotFoundError = require("../../errors/notFoundError");
const ResolutionDto = require("../../dtos/resolutionDto");

module.exports = class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(patientId, resolution, doctorId, ttl) {
    try {
      await this.storage.create(patientId, resolution, doctorId, ttl);
    } catch (error) {
      throw new CatchError(error);
    }
  }

  async getResolutions(name) {
    try {
      const patients = await patientStorage.getPatientsByName(name);

      if (!patients) throw new NotFoundError(PATIENT_NOT_FOUND);
      if (patients.length > 1) return { patients };

      const resolutions = await this.storage.findById(patients[0].id);
      if (!resolutions) throw new NotFoundError(RESOLUTION_NOT_FOUND);

      const resolutionsDto = resolutions.map(
        (resolution) => new ResolutionDto(patients[0], resolution)
      );

      return { resolutions: resolutionsDto };
    } catch (error) {
      throw new CatchError(error);
    }
  }

  async delete(params, doctorId) {
    try {
      const isDeleted = await this.storage.delete(params, doctorId);

      if (!isDeleted) throw new NotFoundError(RESOLUTION_NOT_FOUND);

      return isDeleted;
    } catch (error) {
      throw new CatchError(error);
    }
  }
};
