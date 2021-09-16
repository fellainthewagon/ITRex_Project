const { NOT_FOUND } = require("http-status-codes");

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
};
