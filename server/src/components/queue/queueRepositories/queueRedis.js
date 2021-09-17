const config = require("../../../../config");
const DatabaseError = require("../../../errors/databaseError");
const redis = require("../../../redis");

module.exports = class QueueRedis {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
    this.listName = "queue:";
  }

  async addToList(data) {
    try {
      const { id, name, specialization } = data;
      const json = JSON.stringify({ id, name });

      await this.client.rpushAsync(this.listName + specialization, json);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getFirstFromList(specialization) {
    try {
      const json = await this.client.lindexAsync(
        this.listName + specialization,
        0
      );

      return JSON.parse(json);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getNextFromList(specialization) {
    try {
      const json = await this.client.lpopAsync(this.listName + specialization);

      return json ? this.getFirstFromList(specialization) : null;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
};
