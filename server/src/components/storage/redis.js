const config = require("../../../config");
const DatabaseException = require("../../errors/databaseException");
const redis = require("../../redis");

module.exports = class Redis {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
    this.DatabaseException = DatabaseException;
    this.listName = "queue";
    this.existPrefix = "q:";
    this.prefix = "resolution:";
  }

  async getFirstFromList() {
    try {
      const json = await this.client.lindexAsync(this.listName, 0);

      return JSON.parse(json);
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async getNextFromList() {
    try {
      const json = await this.client.lpopAsync(this.listName);
      const data = JSON.parse(json);
      await this.client.delAsync(this.existPrefix + data.id);

      return this.getFirstFromList();
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async addToList(data) {
    try {
      if (await this.inQueue(data.id)) return;

      const json = JSON.stringify(data);
      await this.client.rpushAsync(this.listName, json);
      await this.client.setAsync(this.existPrefix + data.id, data.id);
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async inQueue(id) {
    try {
      return this.client.getAsync(this.existPrefix + id);
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async createResolution(patientId, resolution, ttl) {
    try {
      await this.client.setexAsync(this.prefix + patientId, ttl, resolution);
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async findResolutionById(patientId) {
    try {
      const resolution = await this.client.getAsync(this.prefix + patientId);

      return resolution ? { patientId, resolution } : null;
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }

  async deleteResolutionById(patientId) {
    try {
      return this.client.delAsync(this.prefix + patientId);
    } catch (error) {
      throw new this.DatabaseException(error);
    }
  }
};
