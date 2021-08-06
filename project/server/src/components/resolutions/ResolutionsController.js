const resolutionsService = require("./ResolutionsService");

class ResolutionsController {
  async addResolution(req, res, next) {
    try {
      await resolutionsService.addResolution(req.body);
      return res.status(201).json({ message: "Patient added to storage" });
    } catch (error) {
      return next(error);
    }
  }

  async getResolution(req, res, next) {
    try {
      const resolution = await resolutionsService.getResolution(
        req.params.name
      );
      if (resolution) {
        return res.json(resolution);
      }
      return res.status(404).send({ message: "Patient not found" });
    } catch (error) {
      return next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      await resolutionsService.deleteResolution(req.params.name);
      return res.json({ message: "Patient successfully deleted" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ResolutionsController();
