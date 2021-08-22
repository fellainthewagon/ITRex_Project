const Factory = require("../storage/factory");
const config = require("../../../config");
const db = require("../../../src/db");

class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async addToQueue(data) {
    try {
      const { id, name } = (await db.Patient.create({ name: data })).get({
        plain: true,
      });

      await this.storage.addToList({ id, name });

      return { id, name };
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentPerson() {
    try {
      const data = await this.storage.getFirstFromList();

      return data || null;
    } catch (error) {
      console.log(error);
    }
  }

  async getNextPerson() {
    try {
      await this.storage.popFromList();
      const data = await this.storage.getFirstFromList();

      return data || null;
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 *  start point for setting type of storage => redis || memory
 */

module.exports = new QueueService(Factory.create(config.queueStorage));
