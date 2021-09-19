const patientStorage = require("../repositories/patientStorage");
const CatchError = require("../../errors/catchError");

module.exports = class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(patientId, resolution, ttl, doctorId) {
    try {
      await this.storage.create(patientId, resolution, ttl, doctorId);
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getPatientResolutions(name, role, id) {
    try {
      let patient;
      if (role === "patient") {
        patient = await patientStorage.findPatientById(id);
      } else {
        patient = await patientStorage.findPatientByName(name);
      }
      if (!patient) return null;
      const data = await this.storage.findById(patient.id);
      if (!data) return null;
      const resolutions = [];
      data.forEach((resolution) => {
        if (resolution) {
          resolutions.push(resolution);
        }
      });
      return resolutions;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async delete(patientId, doctorId) {
    try {
      const isDeleted = await this.storage.deleteByIdAndDoctorName(
        patientId,
        doctorId
      );

      return isDeleted || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
};
