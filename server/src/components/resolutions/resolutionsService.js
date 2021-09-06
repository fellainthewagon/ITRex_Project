const Factory = require("../storage/factory");
const patientStorage = require("../storage/patientStorage");
const ResolutionDto = require("../../dtos/resolutionDto");
const CatchError = require("../../errors/catchError");
const config = require("../../../config");

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
      const patient = await patientStorage.findOne(name);
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

const resolutionsService = new ResolutionsService(
  Factory.create(config.resolutionsStorage)
);
module.exports = { resolutionsService, ResolutionsService };
