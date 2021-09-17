const { NO_CONTENT } = require("http-status-codes");
const ResolutionsService = require("./resolutionsService");
const ResolutionFactory = require("./resolutionRepositories/resolutionFactory");
const config = require("../../../config");

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
        req.user.doctor_id,
        config.app.ttl
      );

      return res.status(NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  }

  async getResolution(req, res, next) {
    try {
      const { patients, resolutions } =
        await this.resolutionsService.getResolutions(req.query.name);

      return patients ? res.json({ patients }) : res.json({ resolutions });
    } catch (error) {
      return next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      await this.resolutionsService.delete(req.params, req.user.doctor_id);

      return res.status(NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ResolutionsController();
