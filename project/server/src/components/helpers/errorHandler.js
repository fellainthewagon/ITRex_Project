module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err, message: err.message });
};
