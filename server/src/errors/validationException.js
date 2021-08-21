const { BAD_REQUEST } = require("http-status-codes");

module.exports = class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
};
