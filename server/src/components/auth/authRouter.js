const { Router } = require("express");
const checkCredential = require("../../middleware/checkCredential");
const checkExistUser = require("../../middleware/checkExistUser");
const authController = require("./authController");
const deserializeUser = require("../../middleware/deserializeUser");
const {
  validateRegisterData,
  validateLoginData,
} = require("../../middleware/validators");

const authRouter = Router();

authRouter.get("/", deserializeUser, async (req, res, next) => {
  await authController.getUser(req, res, next);
});

authRouter.post(
  "/register",
  validateRegisterData,
  checkExistUser,
  async (req, res, next) => {
    await authController.register(req, res, next);
  }
);

authRouter.post(
  "/login",
  validateLoginData,
  checkCredential,
  async (req, res, next) => {
    await authController.login(req, res, next);
  }
);

module.exports = authRouter;
