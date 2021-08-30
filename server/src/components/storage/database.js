const DatabaseException = require("../../errors/databaseException");
const { Resolution } = require("../../db");

module.exports = class Database {
  constructor() {
    this.Resolution = Resolution;
    this.DatabaseException = DatabaseException;
  }

  async create(id, resolution, ttl) {
    try {
      const timestamp = Date.now() + ttl * 1000;

      await this.Resolution.create({
        patient_id: id,
        resolution,
        expire_timestamp: timestamp,
      });
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async findById(id) {
    try {
      const resolution = await this.Resolution.findOne({
        where: { patient_id: id },
      });

      if (!resolution) return null;

      if (resolution.expire_timestamp < Date.now()) {
        await resolution.destroy();
        return null;
      }

      return resolution.dataValues;
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async deleteById(id) {
    try {
      return await this.Resolution.destroy({ where: { patient_id: id } });
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }
};
