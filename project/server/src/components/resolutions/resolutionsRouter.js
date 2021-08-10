const { Router } = require("express");
const resolutionsController = require("./ResolutionsController");
const Validate = require("../../middleware/Validate");

const resolutionsRouter = Router();

resolutionsRouter.use("/:key/resolution", Validate.keyParams);
/**
 * @swagger
 * /patients/{key}/resolution:
 *   post:
 *     tags: [resolutions]
 *     description: Add resolutions
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         example: "vincent"
 *         description: Patient key (name)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 */
resolutionsRouter.post(
  "/:key/resolution",
  Validate.body,
  resolutionsController.addResolution
);

/**
 * @swagger
 * /patients/{key}/resolution:
 *   get:
 *     tags: [resolutions]
 *     description: Get patient resolution
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         example: "vincent"
 *         description: Patient key (name)
 *     responses:
 *       '200':
 *         description: Get resolution has been successfully
 *         content:
 *           application/json:
 *             example: {resolution: "drug addict"}
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "'Key' parameter is not valid"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {message: "Resolution not found"}
 */
resolutionsRouter.get("/:key/resolution", resolutionsController.getResolution);

/**
 * @swagger
 * /patients/{key}/resolution:
 *   delete:
 *     tags: [resolutions]
 *     description: Delete patient resolution
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         example: "vincent"
 *         description: Patient key (name) that need delete
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
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {message: "Resolution not found"}
 */
resolutionsRouter.delete(
  "/:key/resolution",
  resolutionsController.deleteResolution
);

module.exports = resolutionsRouter;
