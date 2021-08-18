const { queueStorageService } = require("../storageFactory");

class QueueService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  async getCurrent() {
    return this.storageService.getFirst();
  }

  async getNext() {
    return this.storageService.getNext();
  }

  async add(value) {
    await this.storageService.add(value);
  }
}

module.exports = new QueueService(queueStorageService);
