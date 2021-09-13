const config = require("../../../../config");
const ApiError = require("../../../errors/apiError");
const redis = require("../../../redis");

module.exports = class QueueRedis {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
    this.listName = "queue";
    this.existPrefix = "q:";
  }

  async getFirstFromList(specialization) {
    try {
      const json = await this.client.lindexAsync(
        `${this.listName}:${specialization}`,
        0
      );

      return JSON.parse(json);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async getNextFromList(specialization) {
    try {
      const json = await this.client.lpopAsync(
        `${this.listName}:${specialization}`
      );

      if (!json) return null;
      const data = JSON.parse(json);
      await this.client.delAsync(this.existPrefix + data.id);
      return this.getFirstFromList(specialization);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async addToList(data) {
    try {
      if (await this.inQueue(data.id)) return;
      const json = JSON.stringify(data);
      await this.client.rpushAsync(
        `${this.listName}:${data.specialization}`,
        json
      );
      await this.client.setAsync(this.existPrefix + data.id, data.id);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async inQueue(id) {
    try {
      return this.client.getAsync(this.existPrefix + id);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }
};
