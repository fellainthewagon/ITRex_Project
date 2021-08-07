const ValidationException = require("../errors/ValidationException");

const validParamsName = (req, res, next) => {
  if (!req.params.name) {
    console.log(req.params);
    throw new ValidationException("Name cannot be empty");
  }
  next();
};

const validResolution = (req, res, next) => {
  if (!req.body.resolution) {
    throw new ValidationException("Resolution cannot be empty");
  }
  next();
};

const validName = (req, res, next) => {
  if (!req.body.name) {
    throw new ValidationException("Name cannot be empty");
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err, message: err.message });
};

module.exports = { validParamsName, validResolution, validName, errorHandler };
