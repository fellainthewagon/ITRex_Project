const { Router } = require("express");
const doctorController = require("./doctorController");

const doctorRouter = Router();

doctorRouter.get("/", async (req, res, next) => {
  await doctorController.getDoctor(req, res, next);
});

module.exports = doctorRouter;
