const Factory = require("../storageFactory");
const config = require("../../../config");

class ResolutionsService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async add(key, resolution, ttl) {
    await this.storage.create(key, resolution, ttl);
  }

  async get(key) {
    const resolution = await this.storage.findByName(key);

    return resolution ? { key, resolution } : null;
  }

  async delete(key) {
    const isDeleted = await this.storage.deleteByName(key);

    return isDeleted || null;
  }
}

module.exports = new ResolutionsService(
  Factory.create(config.resolutionsStorage)
);
