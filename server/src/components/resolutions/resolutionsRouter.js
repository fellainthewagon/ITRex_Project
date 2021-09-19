const { Router } = require("express");
const resolutionsController = require("./resolutionsController");
const {
  validateParams,
  validateQueryParams,
  validateAddResolution,
} = require("../../middleware/validators");

const resolutionsRouter = Router();

/**
 * @swagger
 * /api/patients/{id}/resolution:
 *   patch:
 *     tags: [resolutions]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "Resolution for Vincent"
 *     responses:
 *       '204':
 *         description: It means resolution successfully added to database
 *       '400':
 *         description: It means that request body is invalid
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
resolutionsRouter.patch(
  "/:id/resolution",
  validateAddResolution,
  async (req, res, next) => {
    await resolutionsController.addResolution(req, res, next);
  }
);

/**
 * @swagger
 * /api/patients/resolution?name=vincent:
 *   get:
 *     tags: [resolutions]
 *     security:
 *       - bearerAuth: []
 *     description: Get resolution by patient name
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
 *         description: Getting resolution has been successfully
 *         content:
 *           application/json:
 *             example: [{ patientId: 1, name: 'Vincent Vega', gender: 'male', dob: 2020-02-20T00:00:00.000Z, resolutionId: 1, resolution: 'Resolution for Vincent', createdData: 2021-09-18T20:47:11.000Z, doctorName: 'John Jones', doctorSpecialization: 'therapist' }]
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Query is not valid"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 404}, message: "Resolution not found"}
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
resolutionsRouter.get(
  "/resolution",
  validateQueryParams,
  async (req, res, next) => {
    await resolutionsController.getResolution(req, res, next);
  }
);

/**
 * @swagger
 * /api/patients/{id}/resolution/{resolutionId}:
 *   delete:
 *     tags: [resolutions]
 *     security:
 *       - bearerAuth: []
 *     description: Delete patient resolution
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "1"
 *         description: PatientId of resolution that need to delete
 *       - in: path
 *         name: resolutionId
 *         schema:
 *           type: string
 *         required: true
 *         example: "1"
 *         description: Resolution id that need to delete
 *     responses:
 *       '204':
 *         description: Resolution has been successfully deleted
 *       '400':
 *         description: It means that params property in URL is invalid
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 400}, message: "Parameter is not valid"}
 *       '404':
 *         description: It means that resolution not found
 *         content:
 *           application/json:
 *             example: {error: {"statusCode": 404}, message: "Resolution not found"}
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
resolutionsRouter.delete(
  "/:id/resolution/:resolutionId",
  validateParams,
  async (req, res, next) => {
    await resolutionsController.deleteResolution(req, res, next);
  }
);

module.exports = resolutionsRouter;
