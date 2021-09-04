const { Router } = require("express");
const checkExistUser = require("../../middleware/checkExistUser");
const authController = require("./authController");
const {
  validateRegisterData,
  validateLoginData,
} = require("../../middleware/validators");

const authRouter = Router();

authRouter.post(
  "/register",
  validateRegisterData,
  checkExistUser,
  async (req, res, next) => {
    await authController.register(req, res, next);
  }
);

authRouter.post("/login", validateLoginData, async (req, res, next) => {
  await authController.login(req, res, next);
});

authRouter.post("/logout", async (req, res, next) => {
  await authController.logout(req, res, next);
});

module.exports = authRouter;
