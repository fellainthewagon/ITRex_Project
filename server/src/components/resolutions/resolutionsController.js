const resolutionsService = require("./resolutionsService");

class ResolutionsController {
  async addResolution(req, res, next) {
    try {
      const resolution = await resolutionsService.addResolution({
        ...req.params,
        ...req.body,
      });
      return res
        .status(201)
        .json({ resolution, message: "Resolution added to storage" });
    } catch (error) {
      return next(error);
    }
  }

  async getResolution(req, res, next) {
    try {
      const resolution = await resolutionsService.getResolution(req.params.key);
      if (resolution) return res.json(resolution.data);
      return res.status(404).json({ message: "Resolution not found" });
    } catch (error) {
      return next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      const isDeleted = await resolutionsService.deleteResolution(
        req.params.key
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
