const Factory = require("../storage/factory");
const config = require("../../../config");
const db = require("../../../src/db");

class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async addToQueue(data) {
    try {
      const patient = await db.Patient.create({ name: data.name });

      await this.storage.addToList(
        JSON.stringify({
          id: patient.dataValues.id,
          name: patient.dataValues.name,
        })
      );

      return patient.dataValues;
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentPerson() {
    try {
      const data = await this.storage.getFirstFromList();

      return data ? { data: JSON.parse(data) } : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getNextPerson() {
    try {
      await this.storage.popFromList();
      const data = await this.storage.getFirstFromList();

      return data ? { data: JSON.parse(data) } : null;
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 *  start point for setting type of storage => redis || memory
 */

module.exports = new QueueService(Factory.create(config.queueStorage));
