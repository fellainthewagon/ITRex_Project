const resolutionsService = require("./resolutionsService");

class ResolutionsController {
  constructor(resolutionsService) {
    this.resolutionsService = resolutionsService;
  }

  addResolution = async (req, res, next) => {
    try {
      await resolutionsService.addResolution({
        ...req.params,
        ...req.body,
      });
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  getResolution = async (req, res, next) => {
    try {
      const resolution = await resolutionsService.getResolution(req.params.key);
      if (resolution) return res.json(resolution.data);
      return res.status(404).json({ message: "Resolution not found" });
    } catch (error) {
      return next(error);
    }
  };

  deleteResolution = async (req, res, next) => {
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
  };
}

module.exports = new ResolutionsController(resolutionsService);
