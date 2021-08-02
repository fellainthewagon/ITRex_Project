import patientsService from "./PatientsService.js";

class PatientsController {
  async getNextPatient(req, res, next) {
    try {
      const person = await patientsService.getNextPatient();
      return res.json(person);
    } catch (error) {
      return next(error);
    }
  }

  async addPatient(req, res, next) {
    try {
      await patientsService.addPatient(req.body);
      return res.json({ message: "patient added to storage" });
    } catch (error) {
      return next(error);
    }
  }

  async getPatient(req, res, next) {
    try {
      const patient = await patientsService.getPatient(req.params.name);
      return res.json(patient);
    } catch (error) {
      return next(error);
    }
  }

  async deletePatient(req, res, next) {
    try {
      await patientsService.deletePatient(req.params.name);
      return res.json({ message: "patient deleted from storage" });
    } catch (error) {
      return next(error);
    }
  }
}

export default new PatientsController();
