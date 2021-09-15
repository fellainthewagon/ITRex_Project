const patientStorage = require("../repositories/patientStorage");
const CatchError = require("../../errors/catchError");

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
