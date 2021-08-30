const StatusCodes = require("http-status-codes");

module.exports = (err, req, res) => {
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ error: err, message: err.message });
};
