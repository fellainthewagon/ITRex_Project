const config = require("../../../config");
const DatabaseException = require("../../errors/databaseException");
const redis = require("../../redis");

module.exports = class Redis {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
    });
    /*       .on("connect", () =>
        global.console.log(
          `Connected to Redis! | ${config.redis.host}:${config.redis.port}`
        )
      ); */
    this.exception = DatabaseException;
    this.listName = "clinicQueue";
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

  async popFromList() {
    try {
      await this.client.lpopAsync(this.listName);
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

  async create(patientId, data, ttl) {
    try {
      const json = JSON.stringify(data);
      // console.log("redis-create ====>" + json);
      await this.client.setexAsync(this.prefix + patientId, ttl, json);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async findById(patientId) {
    try {
      // console.log("redis-create ====>" + this.prefix + patientId);
      const json = await this.client.getAsync(this.prefix + patientId);

      return JSON.parse(json);
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
