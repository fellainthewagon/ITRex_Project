const { Router } = require("express");
const { validName } = require("../middleware/validators");
const queueController = require("./QueueController");

const queueRouter = Router();

queueRouter.get("/queue/first", queueController.firstPerson);
queueRouter.get("/queue/next", queueController.getNextPerson);
queueRouter.post("/queue", validName, queueController.addPerson);

module.exports = queueRouter;
