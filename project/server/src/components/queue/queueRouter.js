const { Router } = require("express");
const { validName } = require("../middleware/middlewares");
const queueController = require("./QueueController");

const queueRouter = Router();

/**
 * @swagger
 * /queue/first:
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
 */
queueRouter.get("/queue/first", queueController.firstPerson);

/**
 * @swagger
 * /queue/next:
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
 */
queueRouter.get("/queue/next", queueController.getNextPerson);

/**
 * @swagger
 * /queue:
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
 *                 example: "vincent"
 *     responses:
 *       '201':
 *         description: It means person added to queue
 *         content:
 *           application/json:
 *             example: {message: "Person added to queue"}
 *       '400':
 *         description: It means request body invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Name cannot be empty"}
 */
queueRouter.post("/queue", validName, queueController.addPerson);

module.exports = queueRouter;
