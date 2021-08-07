const { Router } = require("express");
const resolutionsController = require("./ResolutionsController");
const {
  validParamsName,
  validResolution,
} = require("../middleware/middlewares");

const resolutionsRouter = Router();

/**
 * @swagger
 * /resolutions:
 *   post:
 *     tags: [resolutions]
 *     description: Add resolutions
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
 *               resolution:
 *                 type: string
 *                 example: "drug addict"
 *     responses:
 *       '201':
 *         description: It means resolution successfully created
 *         content:
 *           application/json:
 *             example: {message: "Resolution added to storage"}
 *       '400':
 *         description: It means that request body is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Resolution cannot be empty"}
 */
resolutionsRouter.post(
  "/resolutions",
  validResolution,
  resolutionsController.addResolution
);

/**
 * @swagger
 * /resolutions/{name}:
 *   get:
 *     tags: [resolutions]
 *     description: Get patient resolution
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         example: "vincent"
 *         description: Patient name
 *     responses:
 *       '200':
 *         description: Get resolution has been successfully
 *         content:
 *           application/json:
 *             example: {name: "vincent", resolution: "drug addict"}
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Name cannot be empty"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {message: "Resolution not found"}
 */
resolutionsRouter.get(
  "/resolutions/:name",
  validParamsName,
  resolutionsController.getResolution
);

/**
 * @swagger
 * /resolutions/{name}:
 *   delete:
 *     tags: [resolutions]
 *     description: Delete patient resolution
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         example: "vincent"
 *         description: Patient name that need delete
 *     responses:
 *       '200':
 *         description: Resolution has been successfully deleted
 *         content:
 *           application/json:
 *             example: { message: "Resolution successfully deleted" }
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Name cannot be empty"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {message: "Resolution not found"}
 */
resolutionsRouter.delete(
  "/resolutions/:name",
  validParamsName,
  resolutionsController.deleteResolution
);

module.exports = resolutionsRouter;
