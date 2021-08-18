module.exports = class ResolutionRedisStorage {
  constructor(storage, redis, DatabaseException) {
    this.client = redis
      .createClient(`redis://${storage.host}:${storage.port}/1`)
      .on("connect", () =>
        global.console.log(
          `Connected to Redis! | ${storage.host}:${storage.port} |` +
            ` Database: '${storage.type.split("_")[1]}'`
        )
      );
    this.exception = DatabaseException;
  }

  async create(value, ttl) {
    try {
      await this.client.setexAsync(value.key, ttl, value.resolution);
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async findByKey(key) {
    try {
      const resolution = await this.client.getAsync(key);
      return resolution ? { key, resolution } : null;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async deleteByKey(key) {
    try {
      const isDeleted = await this.client.delAsync(key);
      return isDeleted == 1 || null;
    } catch (error) {
      throw new this.exception(error);
    }
  }
};
