const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

module.exports = (err, req, res) => {
  console.log("ERORRR_____++++++++++++++++++++ ");
  const status = err.statusCode || INTERNAL_SERVER_ERROR;
  res.status(status).json({ error: err, message: err.message });
};
