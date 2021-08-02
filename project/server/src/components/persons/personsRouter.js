import { Router } from "express";
import personsController from "./PersonsController.js";

const personsRouter = Router();

personsRouter.post("/queue", personsController.addPerson);
personsRouter.get("/queue/:name", personsController.getPatient);

export default personsRouter;
