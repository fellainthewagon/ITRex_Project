const { CREATED } = require("http-status-codes");
const QueueService = require("./queueService");
const QueueFactory = require("./queueRepositories/queueFactory");
const config = require("../../../config");
const { QUEUE_EMPTY } = require("../../constants");

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
<<<<<<< HEAD
      const doctorSpecialization =
        await specializationService.getSpecializationByDoctorId(req.params.id);
      const person = await this.queueService.getCurrentPerson(
        doctorSpecialization.specialization.specialization
      );
=======
      const person = await this.queueService.getCurrentPerson();
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  }

  async getNextPerson(req, res, next) {
    try {
<<<<<<< HEAD
      const doctorSpecialization =
        await specializationService.getSpecializationByDoctorId(req.params.id);

      const person = await this.queueService.getNextPerson(
        doctorSpecialization.specialization.specialization
      );
=======
      const person = await this.queueService.getNextPerson();
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a

      return person ? res.json(person) : res.json({ message: QUEUE_EMPTY });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new QueueController();
