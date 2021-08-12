const ValidationException = require("../errors/validationException");
const formatter = require("../utils/formatter");
const valid = require("../schema/resolution");

class Validate {
  static keyParams(req, res, next) {
    if (!valid(req.params)) {
      throw new ValidationException("'Key' parameter is not valid");
    }
    req.params.key = formatter(req.params.key);
    next();
  }

  static body(req, res, next) {
    if (!valid(req.body)) {
      throw new ValidationException("Invalid body");
    }
    next();
  }
}

module.exports = Validate;
