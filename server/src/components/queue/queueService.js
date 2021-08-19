const Factory = require("../storageFactory");
const config = require("../../../config");

class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async getCurrentPerson() {
    const key = await this.storage.getFirstFromList();

    return key ? { key } : null;
  }

  async getNextPerson() {
    await this.storage.popFromList();
    const key = await this.storage.getFirstFromList();

    return key ? { key } : null;
  }

  async addToQueue(data) {
    await this.storage.addToList(data.key);
  }
}

module.exports = new QueueService(Factory.create(config.queueStorage));
