const ValidationException = require("../errors/validationException");
const formatter = require("../utils/formatter");
const valid = require("../schema/resolution");

class Validate {
  constructor(formatter, valid) {
    this.formatter = formatter;
    this.valid = valid;
  }

  keyParams = (req, res, next) => {
    if (!this.valid(req.params)) {
      throw new ValidationException("'Key' parameter is not valid");
    }
    req.params.key = this.formatter(req.params.key);
    next();
  };

  body = (req, res, next) => {
    if (!this.valid(req.body)) {
      throw new ValidationException("Invalid body");
    }
    next();
  };
}

module.exports = new Validate(formatter, valid);
