const StatusCodes = require("http-status-codes");
const {
  QUEUE_EMPTY,
  PERSON_CREATED,
} = require("../../constants/statusMessage");
const queueService = require("./queueService");

class QueueController {
  constructor(queueService) {
    this.queueService = queueService;
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

  async addPerson(req, res, next) {
    try {
      const patient = await this.queueService.addToQueue(req.body.name);

      return res.status(StatusCodes.CREATED).json(patient);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new QueueController(queueService);
