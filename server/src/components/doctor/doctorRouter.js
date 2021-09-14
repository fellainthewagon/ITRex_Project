const { Router } = require("express");
const doctorController = require("./doctorController");
const deserializeUser = require("../../middleware/deserializeUser");

const userRouter = Router();

userRouter.get("/:id", deserializeUser, async (req, res, next) => {
  await doctorController.getDoctor(req, res, next);
});

module.exports = userRouter;
