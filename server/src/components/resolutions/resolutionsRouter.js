const { Router } = require("express");
const resolutionsController = require("./resolutionsController");
const validate = require("../../middleware/validate");

const resolutionsRouter = Router();

/**
 * @swagger
 * /patients/{id}/resolution:
 *   patch:
 *     tags: [resolutions]
 *     description: Add resolution
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "1"
 *         description: PatientId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resolution:
 *                 type: object
 *                 example: "hello dniwe"
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
  "/:id/resolution",
  validate.params,
  validate.body,
  async (req, res, next) => {
    await resolutionsController.addResolution(req, res, next);
  }
);

/**
 * @swagger
 * /patients/resolution?name=vincent:
 *   get:
 *     tags: [resolutions]
 *     description: Get patient resolution
 *     parameters:
 *       - in: query
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
 *             example: {patientId: "1", resolution: "hello dniwe", id: "1"}
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Query is not valid"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {message: "Resolution not found"}
 */
resolutionsRouter.get("/resolution", validate.query, async (req, res, next) => {
  await resolutionsController.getResolution(req, res, next);
});

/**
 * @swagger
 * /patients/{id}/resolution:
 *   delete:
 *     tags: [resolutions]
 *     description: Delete patient resolution
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "1"
 *         description: PatientId of resolution that need to delete
 *     responses:
 *       '204':
 *         description: Resolution has been successfully deleted
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Parameter is not valid"}
 *       '404':
 *         description: It means that resolution not found in the repo
 *         content:
 *           application/json:
 *             example: {message: "Resolution not found"}
 */
resolutionsRouter.delete(
  "/:id/resolution",
  validate.params,
  async (req, res, next) => {
    await resolutionsController.deleteResolution(req, res, next);
  }
);

module.exports = resolutionsRouter;
