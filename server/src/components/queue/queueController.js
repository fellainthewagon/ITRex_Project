const { CREATED } = require("http-status-codes");
const QueueService = require("./queueService");
const QueueFactory = require("./queueRepositories/queueFactory");
const config = require("../../../config");
const { QUEUE_EMPTY } = require("../../constants");
const specializationService = require("../specialization/specializationService");

class QueueController {
  constructor() {
    this.queueService = new QueueService(
      QueueFactory.create(config.queueStorage)
    );
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
      const doctorSpecialization =
        await specializationService.getSpecializationByDoctorId(req.params.id);

      const person = await this.queueService.getCurrentPerson(
        doctorSpecialization.specialization
      );

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  }

  async getNextPerson(req, res, next) {
    try {
      const doctorSpecialization =
        await specializationService.getSpecializationByDoctorId(req.params.id);

      const person = await this.queueService.getNextPerson(
        doctorSpecialization.specialization
      );

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new QueueController();
