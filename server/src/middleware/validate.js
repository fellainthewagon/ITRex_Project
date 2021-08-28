const ValidationException = require("../errors/validationException");
const valid = require("../schema/schema");
const { INVALID_PARAMS, INVALID_BODY } = require("../constants/statusMessage");

class Validate {
  constructor(valid) {
    this.valid = valid;
  }

  params = (req, res, next) => {
    if (!this.valid(req.params)) {
      throw new ValidationException(INVALID_PARAMS);
    }
    next();
  };

  query = (req, res, next) => {
    if (!this.valid(req.query)) {
      throw new ValidationException(INVALID_QUERY);
    }
    next();
  };

  body = (req, res, next) => {
    console.log(req.body);
    if (!this.valid(req.body)) {
      throw new ValidationException(INVALID_BODY);
    }
    next();
  };
}

module.exports = new Validate(valid);
