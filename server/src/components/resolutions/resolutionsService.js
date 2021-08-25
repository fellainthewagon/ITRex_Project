const Factory = require("../storage/factory");
const config = require("../../../config");
const { Patient } = require("../../db");

class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(patientId, resolution, ttl) {
    try {
      await this.storage.create(patientId, resolution, ttl);
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(name) {
    try {
      const patient = await Patient.findOne({ where: { name } });
      if (!patient) return null; // "Patient not found"

      const data = await this.storage.findById(patient.id);

      return data || null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(patientId) {
    try {
      const isDeleted = await this.storage.deleteById(patientId);

      return isDeleted || null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

/**
 *  start point for setting type of storage => redis || memory
 */

module.exports = new ResolutionsService(
  Factory.create(config.resolutionsStorage)
);

// db.Patient.findOne({
//   where: { id: 4 },
//   include: "resolutions",
//   raw: true,
//   nest: true,
// }).then((data) => console.log(data));

// db.Resolution.findAll({
//   where: { patientId: 4 },
//   raw: true,
//   nest: true,
// }).then((data) => console.log(data));
