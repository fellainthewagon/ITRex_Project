module.exports = class RedisStorage {
  constructor(storage, redis, DatabaseException) {
    this.redis = redis;
    this.storage = storage;
    this.client = this.redis.createClient(this.storage.port, this.storage.host);
    this.client.on("connect", () =>
      global.console.log("... connected to Redis!")
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
