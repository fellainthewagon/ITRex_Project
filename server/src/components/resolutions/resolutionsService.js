const Factory = require("../storage/factory");
const config = require("../../../config");
const { Patient } = require("../../db");
const ResolutionDto = require("../../dtos/resolutionDto");
const CatchError = require("../../errors/catchError");

class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(patientId, resolution, ttl) {
    try {
      await this.storage.create(patientId, resolution, ttl);
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async get(name) {
    try {
      const patient = await Patient.findOne({ where: { name } });
      if (!patient) return null;

      const data = await this.storage.findById(patient.id);
      if (!data) return null;

      const resolution = new ResolutionDto(data);

      return resolution;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async delete(patientId) {
    try {
      const isDeleted = await this.storage.deleteById(patientId);

      return isDeleted || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
}

module.exports = new ResolutionsService(
  Factory.create(config.resolutionsStorage)
);
