const Factory = require("../storage/factory");
const config = require("../../../config");
const { Patient } = require("../../db");

class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async addToQueue(name) {
    try {
      const [patient] = await Patient.findOrCreate({ where: { name } });

      await this.storage.addToList({
        id: patient.id,
        name: patient.name,
      });

      return { id: patient.id, name: patient.name };
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
