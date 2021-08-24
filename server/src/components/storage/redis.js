const config = require("../../../config");
const DatabaseException = require("../../errors/databaseException");
const redis = require("../../redis");

module.exports = class Redis {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
    this.exception = DatabaseException;
    this.listName = "queue";
    this.prefix = "resolution:";
  }

  async getFirstFromList() {
    try {
      const json = await this.client.lindexAsync(this.listName, 0);
      return JSON.parse(json);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async getNextFromList() {
    try {
      await this.client.lpopAsync(this.listName);
      return this.getFirstFromList();
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async addToList(data) {
    try {
      const json = JSON.stringify(data);
      await this.client.rpushAsync(this.listName, json);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async create(patientId, resolution, ttl) {
    try {
      await this.client.setexAsync(this.prefix + patientId, ttl, resolution);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async findById(patientId) {
    try {
      const resolution = await this.client.getAsync(this.prefix + patientId);

      return resolution ? { patientId, resolution } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async deleteById(patientId) {
    try {
      return this.client.delAsync(this.prefix + patientId);
    } catch (error) {
      throw new this.exception(error);
    }
  }
};
