const { Router } = require("express");
const personsController = require("./PersonsController");

const personsRouter = Router();

personsRouter.get("/queue/first", personsController.firstPerson);
personsRouter.get("/queue/next", personsController.getNextPatient);
personsRouter.post("/queue", personsController.addPerson);

module.exports = personsRouter;
