const { Router } = require("express");
const patientsController = require("./PatientsController");

const patientsRouter = Router();

patientsRouter.post("/patients", patientsController.addPatient);
patientsRouter.get("/patients/:name", patientsController.getPatient);
patientsRouter.delete("/patients/:name", patientsController.deletePatient);

module.exports = patientsRouter;
