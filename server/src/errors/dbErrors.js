const { NOT_FOUND } = require("http-status-codes");

module.exports = class DbError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }

  static NoMatches(message) {
    return new DbError(NOT_FOUND, message);
  }
};
