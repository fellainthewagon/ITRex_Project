const DatabaseException = require("../../errors/databaseException");
const db = require("../../db");

module.exports = class Database {
  constructor() {
    this.Resolution = db.Resolution;
    this.DatabaseException = DatabaseException;
  }

  async create(patientId, resolution, ttl) {
    try {
      const timestamp = Date.now() + ttl * 1000;

      await this.Resolution.create({
        patientId,
        resolution,
        timestamp,
      });
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async findById(id) {
    try {
      const resolution = await this.Resolution.findOne({
        where: { patientId: id },
      });

      if (!resolution) return null; // Resolution not found

      if (resolution.timestamp < Date.now()) {
        await resolution.destroy();
        return null; // "Resolution expired"
      }

      return resolution.dataValues;
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async deleteById(patientId) {
    try {
      return await this.Resolution.destroy({ where: { patientId } });
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }
};
