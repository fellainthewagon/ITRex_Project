const { Router } = require("express");
const resolutionsController = require("./ResolutionsController");
const {
  validParamsName,
  validResolution,
} = require("../middleware/validators");

const resolutionsRouter = Router();

resolutionsRouter.post(
  "/resolutions",
  validResolution,
  resolutionsController.addResolution
);

resolutionsRouter.get(
  "/resolutions/:name",
  validParamsName,
  resolutionsController.getResolution
);

resolutionsRouter.delete(
  "/resolutions/:name",
  validParamsName,
  resolutionsController.deleteResolution
);

module.exports = resolutionsRouter;
