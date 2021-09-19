const { Router } = require("express");
const profileController = require("./profileController");

const profileRouter = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags: [profile]
 *     security:
 *       - bearerAuth: []
 *     description: Get profile information
 *     responses:
 *       '200':
 *         description: It means get profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: "Jules Winnfield"
 *                  dob:
 *                    type: date
 *                    example: "2929-09-08T00:00:00.000Z"
 *                  gender:
 *                    type: string
 *                    example: "male"
 *                  email:
 *                    type: string
 *                    example: "jules@mail.ru"
 *       '404':
 *         description: It means that user not found
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 404}, message: "User not found"}
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
profileRouter.get("/", async (req, res, next) => {
  await profileController.getProfile(req, res, next);
});

module.exports = profileRouter;
