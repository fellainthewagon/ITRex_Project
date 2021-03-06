const { Router } = require("express");
const doctorController = require("./doctorController");

const doctorRouter = Router();

/**
 * @swagger
 * /api/doctor:
 *   get:
 *     tags: [doctor]
 *     security:
 *       - bearerAuth: []
 *     description: Get doctor information
 *     responses:
 *       '200':
 *         description: It means get doctor data
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
 *                    example: "John Jones"
 *                  specialization:
 *                    type: object
 *                    example: {specialization: "therapist"}
 *       '404':
 *         description: It means that doctor not found
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 404}, message: "Doctor not found"}
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
doctorRouter.get("/", async (req, res, next) => {
  await doctorController.getDoctor(req, res, next);
});

module.exports = doctorRouter;
