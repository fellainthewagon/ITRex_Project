import { Router } from "express";
import personsController from "./PersonsController.js";

const personsRouter = Router();

personsRouter.get("/queue/first", personsController.firstPerson);
personsRouter.post("/queue", personsController.addPerson);

export default personsRouter;
