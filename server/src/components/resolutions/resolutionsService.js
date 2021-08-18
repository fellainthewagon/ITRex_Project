const { resolutionStorageService } = require("../storageFactory");

class ResolutionsService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  async addResolution(value, ttl) {
    await this.storageService.create(value, ttl);
  }

  async getResolution(key) {
    return this.storageService.findByKey(key);
  }

  async deleteResolution(key) {
    return this.storageService.deleteByKey(key);
  }
}

module.exports = new ResolutionsService(resolutionStorageService);
