const ValidationException = require("../errors/validationException");
const formatter = require("../utils/formatter");
const valid = require("../schema/resolution");
const { INVALID_PARAMS, INVALID_BODY } = require("../constants/statusMessage");

class Validate {
  constructor(formatter, valid) {
    this.formatter = formatter;
    this.valid = valid;
  }

  keyParams = (req, res, next) => {
    if (!this.valid(req.params)) {
      throw new ValidationException(INVALID_PARAMS);
    }
    req.params.key = this.formatter(req.params.key);
    next();
  };

  body = (req, res, next) => {
    if (!this.valid(req.body)) {
      throw new ValidationException(INVALID_BODY);
    }
    next();
  };
}

module.exports = new Validate(formatter, valid);
