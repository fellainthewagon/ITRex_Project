const { queueStorageService } = require("../storageFactory");

class QueueService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  getCurrent = async () => {
    return this.storageService.getCurrent();
  };

  getNext = async () => {
    return this.storageService.getNext();
  };

  add = async (value) => {
    await this.storageService.add(value);
  };
}

module.exports = new QueueService(queueStorageService);
