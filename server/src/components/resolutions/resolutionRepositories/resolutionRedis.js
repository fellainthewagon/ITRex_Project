const config = require("../../../../config");
const ApiError = require("../../../errors/apiError");
const redis = require("../../../redis");

module.exports = class ResolutionRedis {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
    this.prefix = "resolution:";
  }

  async create(patientId, resolution, ttl) {
    try {
      await this.client.setexAsync(this.prefix + patientId, ttl, resolution);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async findById(patientId) {
    try {
      const resolution = await this.client.getAsync(this.prefix + patientId);

      return resolution ? { patient_id: patientId, resolution } : null;
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async deleteById(patientId) {
    try {
      return this.client.delAsync(this.prefix + patientId);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }
};
