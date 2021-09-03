const Factory = require("../storage/factory");
const config = require("../../../config");

class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async addToQueue(patient) {
    try {
      await this.storage.addToList(patient);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCurrentPerson() {
    try {
      const data = await this.storage.getFirstFromList();

      return data || null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNextPerson() {
    try {
      const data = await this.storage.getNextFromList();

      return data || null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new QueueService(Factory.create(config.queueStorage));
