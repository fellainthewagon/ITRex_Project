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
    // { id: 1, name: 'mia walles', specialization: 'therapist' }
  }

  async getCurrentPerson(specialization) {
    try {
      const data = await this.storage.getFirstFromList(specialization);

      return data || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async getNextPerson(specialization) {
    try {
      const data = await this.storage.getNextFromList(specialization);

      return data || null;
    } catch (error) {
      throw new CatchError(error.message);
    }
  }
};
