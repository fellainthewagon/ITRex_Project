const { Router } = require("express");
const queueController = require("./queueController");
const validate = require("../../middleware/validate");

const queueRouter = Router();

/**
 * @swagger
 * /queue/current:
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
queueRouter.get("/current", queueController.getCurrentPerson);

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
queueRouter.get("/next", queueController.getNextPerson);

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
 *               key:
 *                 type: string
 *                 example: "vincent"
 *     responses:
 *       '201':
 *         description: It means person added to queue (created)
 *         content:
 *           application/json:
 *             example: {message: "Person added to Queue"}
 *       '400':
 *         description: It means request body invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 */
queueRouter.post("/", validate.body, queueController.addPerson);

module.exports = queueRouter;
