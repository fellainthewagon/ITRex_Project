const StatusCodes = require("http-status-codes");
const ResolutionsService = require("./resolutionsService");
const ResolutionFactory = require("./resolutionRepositories/resolutionFactory");
const config = require("../../../config");
const { RESOLUTION_NOT_FOUND } = require("../../constants");
const doctorService = require("../doctor/doctorService");

class ResolutionsController {
  constructor() {
    this.resolutionsService = new ResolutionsService(
      ResolutionFactory.create(config.resolutionsStorage)
    );
  }

  async addResolution(req, res, next) {
    try {
      const doctorData = await doctorService.getDoctorSpecializationByUserId(
        req.user.id
      );

      const { resolution } = req.body;

      await this.resolutionsService.add(
        req.params.id,
        resolution,
        config.app.ttl,
        doctorData.id
      );

      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  }

  async getResolution(req, res, next) {
    try {
      const resolution = await this.resolutionsService.getPatientResolutions(
        req.query.name,
        req.user.role,
        req.user.id
      );

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
      const doctor = await doctorService.getDoctorSpecializationByUserId(
        req.user.id
      );

      const isDeleted = await this.resolutionsService.delete(
        req.params.id,
        doctor.id
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
