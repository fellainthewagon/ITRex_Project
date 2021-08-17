module.exports = class ResolutionRedisStorage {
  constructor(storage, redis, DatabaseException) {
    this.storage = storage;
    this.redis = redis;
    this.client = this.redis.createClient(
      `redis://${this.storage.host}:${this.storage.port}/1`
    );
    this.client.on("connect", () =>
      global.console.log(
        `Connected to Redis! | ${this.storage.host}:${this.storage.port} |` +
          ` Database: '${this.storage.type.split("_")[1]}'`
      )
    );
    this.exception = DatabaseException;
  }

  create = async (value, ttl) => {
    try {
      await this.client.setexAsync(value.key, ttl, value.resolution);
    } catch (error) {
      throw new this.exception(error);
    }
  };

  findByKey = async (key) => {
    try {
      const resolution = await this.client.getAsync(key);
      return resolution ? { key, resolution } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  };

  deleteByKey = async (key) => {
    try {
      const isDeleted = await this.client.delAsync(key);
      return isDeleted == 1 || null;
    } catch (error) {
      throw new this.exception(error);
    }
  };
};
