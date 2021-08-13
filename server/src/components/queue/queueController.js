const queueService = require("./queueService");
const StatusCodes = require("http-status-codes");
const msg = require("../../library/statusMessage");

class QueueController {
  constructor(queueService) {
    this.queueService = queueService;
  }

  getCurrentPerson = async (req, res, next) => {
    try {
      const person = await this.queueService.getCurrent();

      return person ? res.json(person) : res.json({ message: msg.QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  };

  getNextPerson = async (req, res, next) => {
    try {
      const person = await this.queueService.getNext();

      return person ? res.json(person) : res.json({ message: msg.QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  };

  addPerson = async (req, res, next) => {
    try {
      await this.queueService.add(req.body);

      return res
        .status(StatusCodes.CREATED)
        .json({ message: msg.PERSON_CREATED });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new QueueController(queueService);
