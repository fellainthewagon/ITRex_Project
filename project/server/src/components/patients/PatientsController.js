const patientsService = require("./PatientsService");

class PatientsController {
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
      return res.status(404).send({ message: "Patient not found" });
    } catch (error) {
      return next(error);
    }
  }

  async deletePatient(req, res, next) {
    try {
      await patientsService.deletePatient(req.params.name);
      return res.json({ message: "Patient successfully deleted" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new PatientsController();
