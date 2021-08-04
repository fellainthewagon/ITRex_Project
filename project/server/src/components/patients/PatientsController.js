const patientsService = require("./PatientsService.js");

class PatientsController {
  async getNextPatient(req, res, next) {
    try {
      const person = await patientsService.getNextPatient();
      if (person) {
        return res.json(person);
      }
      return res.json({ message: "The Queue is empty" });
    } catch (error) {
      return next(error);
    }
  }

  async addPatient(req, res, next) {
    try {
      await patientsService.addPatient(req.body);
      return res.json({ message: "Patient added to storage" });
    } catch (error) {
      return next(error);
    }
  }

  async getPatient(req, res, next) {
    try {
      const patient = await patientsService.getPatient(req.params.name);
      if (patient) {
        return res.json(patient);
      }
      return res.json({ message: "Patient not found" });
    } catch (error) {
      return next(error);
    }
  }

  async deletePatient(req, res, next) {
    try {
      await patientsService.deletePatient(req.params.name);
      return res.json({ message: "patient successfully deleted" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new PatientsController();
