const { UNAUTHORIZED } = require("http-status-codes");

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
};
