const { Router } = require("express");
const userController = require("./userController");
const deserializeUser = require("../../middleware/deserializeUser");

const userRouter = Router();

userRouter.get("/:id", deserializeUser, async (req, res, next) => {
  await userController.getUser(req, res, next);
});

module.exports = userRouter;
