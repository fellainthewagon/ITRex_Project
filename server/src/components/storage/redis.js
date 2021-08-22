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
      return this.client.lindexAsync(this.listName, 0);
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
      await this.client.rpushAsync(this.listName, data);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async create(patientId, data, ttl) {
    try {
      await this.client.setexAsync(this.prefix + patientId, ttl, data);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async findById(patientId) {
    try {
      return this.client.getAsync(this.prefix + patientId);
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
