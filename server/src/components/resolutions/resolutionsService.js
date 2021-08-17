const { resolutionStorageService } = require("../storageFactory");

class ResolutionsService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  addResolution = async (value, ttl) => {
    await this.storageService.create(value, ttl);
  };

  getResolution = async (key) => {
    return this.storageService.findByKey(key);
  };

  deleteResolution = async (key) => {
    return this.storageService.deleteByKey(key);
  };
}

module.exports = new ResolutionsService(resolutionStorageService);
