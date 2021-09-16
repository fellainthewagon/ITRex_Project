const StatusCodes = require("http-status-codes");
const ResolutionsService = require("./resolutionsService");
const ResolutionFactory = require("./resolutionRepositories/resolutionFactory");
const config = require("../../../config");
const { RESOLUTION_NOT_FOUND } = require("../../constants");

class ResolutionsController {
  constructor() {
    this.resolutionsService = new ResolutionsService(
      ResolutionFactory.create(config.resolutionsStorage)
    );
  }

  async addResolution(req, res, next) {
    try {
      await this.resolutionsService.add(
        req.params.id,
        req.body.resolution,
        config.app.ttl,
        req.user.doctor_specialization,
        req.user.doctor_name
      );

      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  }

  async getResolution(req, res, next) {
    try {
      const { patients, resolutions } =
        await this.resolutionsService.getPatientResolutions(req.query.name);

      if (patients) return res.json({ patients });

      return res.json({ resolutions });
    } catch (error) {
      return next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      const isDeleted = await this.resolutionsService.delete(
        req.params.id,
        req.user.doctor_name
      );

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

module.exports = new ResolutionsController();
