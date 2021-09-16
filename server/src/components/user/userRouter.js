const { Router } = require("express");
const userController = require("./userController");

const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  await userController.getUser(req, res, next);
});

module.exports = userRouter;
