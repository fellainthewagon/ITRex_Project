const queueService = require("./QueueService");

class QueueController {
  async firstPerson(req, res, next) {
    try {
      const person = await queueService.getFirst();
      if (person) {
        return res.json(person);
      }
      return res.json({ message: "The Queue is empty" });
    } catch (error) {
      return next(error);
    }
  }

  async getNextPerson(req, res, next) {
    try {
      const person = await queueService.getNext();
      if (person) {
        return res.json(person);
      }
      return res.json({ message: "The Queue is empty" });
    } catch (error) {
      return next(error);
    }
  }

  async addPerson(req, res, next) {
    try {
      await queueService.add(req.body);
      return res.status(201).json({ message: "Person added to queue" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new QueueController();
