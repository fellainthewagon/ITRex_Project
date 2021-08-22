const Factory = require("../storage/factory");
const config = require("../../../config");
const db = require("../../db");

class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(patientId, resolution, ttl) {
    try {
      const saved = await db.Resolution.create({
        resolution,
        patientId,
      });

      await this.storage.create(
        patientId,
        JSON.stringify({
          id: saved.dataValues.id,
          resolution: saved.dataValues.resolution,
          patientId,
        }),
        ttl
      );
    } catch (error) {
      console.log(error);
    }
  }

  async get(name) {
    try {
      const patient = await db.Patient.findOne({ where: { name }, raw: true });
      if (!patient) return null;

      const data = await this.storage.findById(patient.id);

      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(patientId) {
    try {
      await db.Resolution.destroy({ where: { patientId } });

      const isDeleted = await this.storage.deleteById(patientId);

      return isDeleted || null;
    } catch (error) {
      console.log(error);
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
