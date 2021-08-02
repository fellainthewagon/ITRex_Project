import { Router } from "express";
import patientsController from "./PatientsController.js";

const patientsRouter = Router();

patientsRouter.get("/doctor/next", patientsController.getNextPatient);
patientsRouter.post("/doctor", patientsController.addPatient);
patientsRouter.get("/doctor/:name", patientsController.getPatient);
patientsRouter.delete("/doctor/:name", patientsController.deletePatient);

export default patientsRouter;
