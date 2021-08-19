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

  getCurrentPerson = async (req, res, next) => {
    try {
      const person = await this.queueService.getCurrentPerson();

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  };

  getNextPerson = async (req, res, next) => {
    try {
      const person = await this.queueService.getNextPerson();

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  };

  addPerson = async (req, res, next) => {
    try {
      await this.queueService.addToQueue(req.body);

      return res.status(StatusCodes.CREATED).json({ message: PERSON_CREATED });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new QueueController(queueService);
