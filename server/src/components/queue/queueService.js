const { QUEUE_EMPTY } = require("../../constants");
const CatchError = require("../../errors/catchError");
const NotFoundError = require("../../errors/notFoundError");

module.exports = class QueueService {
  constructor(storageType) {
    this.storage = storageType;
  }

  async addToQueue(patient) {
    try {
      await this.storage.addToList(patient);
    } catch (error) {
      throw new CatchError(error);
    }
  }

  async getCurrentPerson(specialization) {
    try {
      const data = await this.storage.getFirstFromList(specialization);
      if (!data) throw new NotFoundError(QUEUE_EMPTY);

      return data;
    } catch (error) {
      throw new CatchError(error);
    }
  }

  async getNextPerson(specialization) {
    try {
      const data = await this.storage.getNextFromList(specialization);
      if (!data) throw new NotFoundError(QUEUE_EMPTY);

      return data;
    } catch (error) {
      throw new CatchError(error);
    }
  }
};
