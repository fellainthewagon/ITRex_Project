module.exports = class QueueRedisStorage {
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
    this.key = "key";
  }

  getCurrent = async () => {
    try {
      const key = await this.client.lindexAsync(this.key, 0);

      return key ? { key } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  };

  getNext = async () => {
    try {
      const key = await this.client.lindexAsync(this.key, 1);
      await this.client.lpopAsync("key");

      return key ? { key } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  };

  add = async (value) => {
    try {
      await this.client.rpushAsync(this.key, value.key);
    } catch (error) {
      throw new this.exception(error);
    }
  };
};
