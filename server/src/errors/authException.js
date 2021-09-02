const { UNAUTHORIZED } = require("http-status-codes");

module.exports = class AuthException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
};
