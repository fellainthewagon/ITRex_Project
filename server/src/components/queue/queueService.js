const CatchError = require("../../errors/catchError");

module.exports = class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async addToQueue(patient) {
    try {
      await this.storage.addToList(patient);
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getCurrentPerson() {
    try {
      const data = await this.storage.getFirstFromList();

      return data || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getNextPerson() {
    try {
      const data = await this.storage.getNextFromList();

      return data || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
};
