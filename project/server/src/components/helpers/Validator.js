const ValidationException = require("../errors/ValidationException");

class Validator {
  static validParamsName(req, res, next) {
    if (!req.params.name) {
      throw new ValidationException("Name cannot be empty");
    }
    next();
  }

  static validResolution(req, res, next) {
    if (!req.body.resolution) {
      throw new ValidationException("Resolution cannot be empty");
    }
    next();
  }

  static validName(req, res, next) {
    if (!req.body.name) {
      throw new ValidationException("Name cannot be empty");
    }
    next();
  }
}

module.exports = Validator;
