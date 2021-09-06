const { Resolution } = require("../../../db");
const ApiError = require("../../../errors/apiError");

module.exports = class ResolutionDatabase {
  constructor() {
    this.Resolution = Resolution;
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
      throw ApiError.DatabaseException(error.message, error);
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
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async deleteById(id) {
    try {
      return await this.Resolution.destroy({ where: { patient_id: id } });
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }
};
