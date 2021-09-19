const { Router } = require("express");
const queueController = require("./queueController");
const { validateQueueData } = require("../../middleware/validators");

const queueRouter = Router();

/**
 * @swagger
 * /api/patients/queue/current:
 *   get:
 *     tags: [queue]
 *     security:
 *       - bearerAuth: []
 *     description: Get first person from queue
 *     responses:
 *       '200':
 *         description: It means get first person
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
 *                    example: "Mia Walles"
 *       '404':
 *         description: It means that no patient in the queue
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 404}, message: "The Queue is empty"}
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
queueRouter.get("/current", async (req, res, next) => {
  await queueController.getCurrentPerson(req, res, next);
});

/**
 * @swagger
 * /api/patients/queue/next:
 *   get:
 *     tags: [queue]
 *     security:
 *       - bearerAuth: []
 *     description: Get next person from queue
 *     responses:
 *       '200':
 *         description: It means get next person
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
 *                    example: "Mia Walles"
 *       '404':
 *         description: It means that no patient in the queue
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 404}, message: "The Queue is empty"}
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
queueRouter.get("/next", async (req, res, next) => {
  await queueController.getNextPerson(req, res, next);
});

/**
 * @swagger
 * /api/patients/queue:
 *   post:
 *     tags: [queue]
 *     security:
 *       - bearerAuth: []
 *     description: Add person to queue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: "Vincent Vega"
 *               specialization:
 *                 type: string
 *                 example: "therapist"
 *     responses:
 *       '201':
 *         description: It means person added to queue (created)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                    type: string
 *                    example: "Vincent Vega"
 *                  id:
 *                    type: integer
 *                    example: 1
 *       '400':
 *         description: It means request body invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
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
queueRouter.post("/", validateQueueData, async (req, res, next) => {
  await queueController.addPerson(req, res, next);
});

module.exports = queueRouter;
