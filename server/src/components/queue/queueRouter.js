const { Router } = require("express");
const queueController = require("./queueController");
const { validateQueueData } = require("../../middleware/validators");

const queueRouter = Router();

/**
 * @swagger
 * /patients/queue/current:
 *   get:
 *     tags: [queue]
 *     description: Get first person from queue
 *     responses:
 *       '200':
 *         description: It means get first person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                    type: string
 *                    example: "jules"
 *                  id:
 *                    type: integer
 *                    example: 99
 */
<<<<<<< HEAD
queueRouter.get("/current/:id", async (req, res, next) => {
=======
queueRouter.get("/current", async (req, res, next) => {
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
  await queueController.getCurrentPerson(req, res, next);
});

/**
 * @swagger
 * /patients/queue/next:
 *   get:
 *     tags: [queue]
 *     description: Get next person from queue
 *     responses:
 *       '200':
 *         description: It means get next person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                    type: string
 *                    example: "butch"
 *                  id:
 *                    type: integer
 *                    example: 100
 */
<<<<<<< HEAD
queueRouter.get("/next/:id", async (req, res, next) => {
=======
queueRouter.get("/next", async (req, res, next) => {
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
  await queueController.getNextPerson(req, res, next);
});

/**
 * @swagger
 * /patients/queue:
 *   post:
 *     tags: [queue]
 *     description: Add person to queue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "butch"
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
 *                    example: "butch"
 *                  id:
 *                    type: integer
 *                    example: 100
 *       '400':
 *         description: It means request body invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 */
queueRouter.post("/", validateQueueData, async (req, res, next) => {
  await queueController.addPerson(req, res, next);
});

module.exports = queueRouter;
