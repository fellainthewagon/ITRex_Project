const { Router } = require("express");
const personsController = require("./PersonsController");

const personsRouter = Router();

personsRouter.get("/queue/first", personsController.firstPerson);
personsRouter.post("/queue", personsController.addPerson);

module.exports = personsRouter;
