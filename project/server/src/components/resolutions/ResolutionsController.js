const resolutionsService = require("./ResolutionsService");

class ResolutionsController {
  async addResolution(req, res, next) {
    try {
      await resolutionsService.addResolution(req.body);
      return res.status(201).json({ message: "Resolution added to storage" });
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
      return res.status(404).json({ message: "Resolution not found" });
    } catch (error) {
      return next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      const isDeleted = await resolutionsService.deleteResolution(
        req.params.name
      );
      if (isDeleted) {
        return res.json({ message: "Resolution successfully deleted" });
      }
      return res.status(404).json({ message: "Resolution not found" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ResolutionsController();
