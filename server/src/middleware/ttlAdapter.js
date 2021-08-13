const config = require("../../config/config");

module.exports = (req, res, next) => {
  const { ttl } = config.app;
  req.body.ttl = ttl;
  next();
};
