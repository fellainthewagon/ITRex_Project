const queueService = require("./queueService");

class QueueController {
  constructor(queueService) {
    this.queueService = queueService;
  }

  getCurrentPerson = async (req, res, next) => {
    try {
      const person = await this.queueService.getCurrent();
      if (person) return res.json(person);
      return res.json({ message: "The Queue is empty" });
    } catch (error) {
      return next(error);
    }
  };

  getNextPerson = async (req, res, next) => {
    try {
      const person = await this.queueService.getNext();
      if (person) return res.json(person);
      return res.json({ message: "The Queue is empty" });
    } catch (error) {
      return next(error);
    }
  };

  addPerson = async (req, res, next) => {
    try {
      await this.queueService.add(req.body);
      return res.status(201).json({ message: "Person added to queue" });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new QueueController(queueService);
