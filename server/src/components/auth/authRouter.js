const { Router } = require("express");
const checkExistUser = require("../../middleware/checkExistUser");
const authController = require("./authController");
const {
  validateRegisterData,
  validateLoginData,
} = require("../../middleware/validators");

const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [auth]
 *     description: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vincent Vega"
 *               email:
 *                 type: string
 *                 example: "vincent@mail.ru"
 *               password:
 *                 type: string
 *                 example: "vincent321"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               dob:
 *                 type: string
 *                 example: "1990-08-08"
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    example: "c90eec40-1971-11ec-9737-cb5c41952428"
 *                  email:
 *                    type: string
 *                    example: "vincent@mail.ru"
 *                  role:
 *                    type: string
 *                    example: "patient"
 *       '400':
 *         description: It means request body is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 *       '409':
 *         description: It means that user with that email already registered
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 409}, message: "A user with this email address already exists"}
 *       '500':
 *         description:  Internal Server Error
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 500}, message: "Some server error message"}
 */
authRouter.post(
  "/register",
  validateRegisterData,
  checkExistUser,
  async (req, res, next) => {
    await authController.register(req, res, next);
  }
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [auth]
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "vincent@mail.ru"
 *               password:
 *                 type: string
 *                 example: "vincent321"
 *     responses:
 *       '200':
 *         description: User successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  user:
 *                    type: string
 *                    example: {id: "c90eec40-1971-11ec-9737-cb5c41952428", email: "vincent@mail.ru", role: "patient"}
 *                  token:
 *                    type: string
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5MGVlYzQwLTE5NzEtMTFlYy05NzM3LWNiNWM0MTk1MjQyOCIsImVtYWlsIjoianVsZXNAbWFpbC5ydSIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNjMyMDc0MjEzLCJleHAiOjE2MzIxNjA2MTN9.UC_CA0HwJbFO22mNMhSYZGo13GK0Mxs3_hbtU4SDbYo"
 *       '400':
 *         description: It means request body is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 *       '401':
 *         description: It means that credentials is wrong
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 401}, message: "Wrong credentials"}
 *       '500':
 *         description:  Internal Server Error
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 500}, message: "Some server error message"}
 */
authRouter.post("/login", validateLoginData, async (req, res, next) => {
  await authController.login(req, res, next);
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [auth]
 *     security:
 *       - bearerAuth: []
 *     description: Logout user
 *     responses:
 *       '200':
 *         description: User successfully logout
 *       '401':
 *         description: Authentication information is missing or invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 401}, message: "A token is required for authentication"}
 *       '500':
 *         description:  Internal Server Error
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 500}, message: "Some server error message"}
 */
authRouter.post("/logout", async (req, res, next) => {
  await authController.logout(req, res, next);
});

module.exports = authRouter;
