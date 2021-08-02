import { Router } from "express";
import patientsController from "./PatientsController.js";

const patientsRouter = Router();

patientsRouter.get("/patients/next", patientsController.getNextPatient);
patientsRouter.post("/patients", patientsController.addPatient);
patientsRouter.get("/patients/:name", patientsController.getPatient);
patientsRouter.delete("/patients/:name", patientsController.deletePatient);

export default patientsRouter;
