const {
  addPatientToQueueValidator,
  validator,
  registerValidator,
  loginValidator,
  addResolutionValidator,
} = require("../schema/schema");
const {
  INVALID_DATA,
  INVALID_BODY,
  INVALID_QUERY,
  INVALID_CREDENTIAL,
  INVALID_REGISTER_DATA,
  INVALID_PARAMS,
} = require("../constants/statusMessage");
const ApiError = require("../errors/apiError");

module.exports.validateQueryParams = (req, res, next) => {
  if (!validator(req.query)) {
    throw ApiError.BadRequest(INVALID_QUERY);
  }
  next();
};

module.exports.validateParams = (req, res, next) => {
  if (!validator(req.params)) {
    throw ApiError.BadRequest(INVALID_PARAMS);
  }
  next();
};

module.exports.validateAddResolution = (req, res, next) => {
  if (
    !addResolutionValidator(req.params) ||
    !addResolutionValidator(req.body)
  ) {
    throw ApiError.BadRequest(INVALID_DATA);
  }
  next();
};

module.exports.validateQueueData = (req, res, next) => {
  if (!addPatientToQueueValidator(req.body)) {
    throw ApiError.BadRequest(INVALID_BODY);
  }
  next();
};

module.exports.validateRegisterData = (req, res, next) => {
  if (!registerValidator(req.body)) {
    throw ApiError.BadRequest(INVALID_REGISTER_DATA);
  }
  next();
};

module.exports.validateLoginData = (req, res, next) => {
  if (!loginValidator(req.body)) {
    throw ApiError.BadRequest(INVALID_CREDENTIAL);
  }
  next();
};
