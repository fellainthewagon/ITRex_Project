const { CREATED } = require("http-status-codes");
const { QUEUE_EMPTY } = require("../../constants");
const queueService = require("./queueService");

class QueueController {
  constructor(service) {
    this.queueService = service;
  }

  async addPerson(req, res, next) {
    try {
      await this.queueService.addToQueue(req.body);

      return res.status(CREATED).send();
    } catch (error) {
      return next(error);
    }
  }

  async getCurrentPerson(req, res, next) {
    try {
      const person = await this.queueService.getCurrentPerson();

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  }

  async getNextPerson(req, res, next) {
    try {
      const person = await this.queueService.getNextPerson();

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new QueueController(queueService);
