const resolutionsService = require("./resolutionsService");
const StatusCodes = require("http-status-codes");
const msg = require("../../library/statusMessage");
const config = require("../../../config/config");

class ResolutionsController {
  constructor(resolutionsService) {
    this.resolutionsService = resolutionsService;
  }

  addResolution = async (req, res, next) => {
    try {
      console.log(req.body);
      await resolutionsService.addResolution(
        { ...req.params, ...req.body },
        config.app.ttl
      );

      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  };

  getResolution = async (req, res, next) => {
    try {
      const resolution = await resolutionsService.getResolution(req.params.key);

      return resolution
        ? res.json(resolution.data)
        : res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: msg.RESOLUTION_NOT_FOUND });
    } catch (error) {
      return next(error);
    }
  };

  deleteResolution = async (req, res, next) => {
    try {
      const isDeleted = await resolutionsService.deleteResolution(
        req.params.key
      );

      return isDeleted
        ? res.status(StatusCodes.NO_CONTENT).send()
        : res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: msg.RESOLUTION_NOT_FOUND });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ResolutionsController(resolutionsService);
