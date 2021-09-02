const ValidationException = require("../errors/validationException");
const {
  addPatientToQueueValidator,
  validator,
  registerValidator,
  loginValidator,
} = require("../schema/schema");
const {
  INVALID_PARAMS,
  INVALID_BODY,
  INVALID_QUERY,
} = require("../constants/statusMessage");

module.exports.params = (req, res, next) => {
  if (!validator(req.params)) {
    throw new ValidationException(INVALID_PARAMS);
  }
  next();
};

module.exports.query = (req, res, next) => {
  if (!validator(req.query)) {
    throw new ValidationException(INVALID_QUERY);
  }
  next();
};

module.exports.validateQueueData = (req, res, next) => {
  if (!addPatientToQueueValidator(req.body)) {
    throw new ValidationException(INVALID_BODY);
  }
  next();
};

module.exports.validateRegisterData = (req, res, next) => {
  if (!registerValidator(req.body)) {
    throw new ValidationException(INVALID_BODY);
  }
  next();
};

module.exports.validateLoginData = (req, res, next) => {
  if (!loginValidator(req.body)) {
    throw new ValidationException(INVALID_BODY);
  }
  next();
};
