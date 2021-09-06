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

  async getFirstFromList() {
    try {
      const json = await this.client.lindexAsync(this.listName, 0);

      return JSON.parse(json);
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async getNextFromList() {
    try {
      const json = await this.client.lpopAsync(this.listName);
      if (!json) return null;

      const data = JSON.parse(json);
      await this.client.delAsync(this.existPrefix + data.id);

      return this.getFirstFromList();
    } catch (error) {
      throw ApiError.DatabaseException(error.message, error);
    }
  }

  async addToList(data) {
    try {
      if (await this.inQueue(data.id)) return;

      const json = JSON.stringify(data);
      await this.client.rpushAsync(this.listName, json);
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
