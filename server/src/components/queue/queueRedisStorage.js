module.exports = class QueueRedisStorage {
  constructor(storage, redis, DatabaseException) {
    this.client = redis
      .createClient(`redis://${storage.host}:${storage.port}/0`)
      .on("connect", () =>
        global.console.log(
          `Connected to Redis! | ${storage.host}:${storage.port} |` +
            ` Database: '${storage.type.split("_")[1]}'`
        )
      );
    this.exception = DatabaseException;
    this.key = "key";
  }

  async getFirst() {
    try {
      const key = await this.client.lindexAsync(this.key, 0);

      return key ? { key } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async getNext() {
    try {
      await this.client.lpopAsync("key");
      const key = await this.client.lindexAsync(this.key, 0);

      return key ? { key } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async add(value) {
    try {
      await this.client.rpushAsync(this.key, value.key);
    } catch (error) {
      throw new this.exception(error);
    }
  }
};
