const StatusCodes = require("http-status-codes");

module.exports = (err, req, res, next) => {
  global.console.error(err.stack);
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ error: err, message: err.message });
};
