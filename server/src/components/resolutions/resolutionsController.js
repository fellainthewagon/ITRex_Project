const StatusCodes = require("http-status-codes");
const { RESOLUTION_NOT_FOUND } = require("../../constants/statusMessage");
const config = require("../../../config");
const resolutionsService = require("./resolutionsService");

class ResolutionsController {
  constructor(service) {
    this.resolutionsService = service;
  }

  async addResolution(req, res, next) {
    try {
      await this.resolutionsService.add(
        req.params.id,
        req.body.resolution,
        config.app.ttl
      );

      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  }

  async getResolution(req, res, next) {
    try {
      const resolution = await this.resolutionsService.get(req.query.name);

      return resolution
        ? res.json(resolution)
        : res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: RESOLUTION_NOT_FOUND });
    } catch (error) {
      return next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      const isDeleted = await this.resolutionsService.delete(req.params.id);

      return isDeleted
        ? res.status(StatusCodes.NO_CONTENT).send()
        : res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: RESOLUTION_NOT_FOUND });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ResolutionsController(resolutionsService);
