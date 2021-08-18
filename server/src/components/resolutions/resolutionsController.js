const { resolutionStorageService } = require("../storageFactory");
const StatusCodes = require("http-status-codes");
const { RESOLUTION_NOT_FOUND } = require("../../library/statusMessage");
const config = require("../../../config");

class ResolutionsController {
  constructor(storageService) {
    this.resolutionStorageService = storageService;
  }

  addResolution = async (req, res, next) => {
    try {
      await this.resolutionStorageService.create(
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
      const resolution = await this.resolutionStorageService.findByKey(
        req.params.key
      );

      return resolution
        ? res.json(resolution)
        : res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: RESOLUTION_NOT_FOUND });
    } catch (error) {
      return next(error);
    }
  };

  deleteResolution = async (req, res, next) => {
    try {
      const isDeleted = await this.resolutionStorageService.deleteByKey(
        req.params.key
      );

      return isDeleted
        ? res.status(StatusCodes.NO_CONTENT).send()
        : res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: RESOLUTION_NOT_FOUND });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ResolutionsController(resolutionStorageService);
