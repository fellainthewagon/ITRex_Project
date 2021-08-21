const { Router } = require("express");
const resolutionsController = require("./resolutionsController");
const validate = require("../../middleware/validate");

const resolutionsRouter = Router();

resolutionsRouter.use("/:key/resolution", validate.keyParams);

/**
 * @swagger
 * /patients/{key}/resolution:
 *   patch:
 *     tags: [resolutions]
 *     description: Add resolution
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
 *       '204':
 *         description: It means resolution successfully created
 *       '400':
 *         description: It means that request body is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Invalid body"}
 */
resolutionsRouter.patch(
  "/:key/resolution",
  validate.body,
  async (req, res, next) => {
    await resolutionsController.addResolution(req, res, next);
  }
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
resolutionsRouter.get("/:key/resolution", async (req, res, next) => {
  await resolutionsController.getResolution(req, res, next);
});

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
 *       '204':
 *         description: Resolution has been successfully deleted
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
resolutionsRouter.delete("/:key/resolution", async (req, res, next) => {
  await resolutionsController.deleteResolution(req, res, next);
});

module.exports = resolutionsRouter;
