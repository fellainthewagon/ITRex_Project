const { UNAUTHORIZED, BAD_REQUEST } = require("http-status-codes");

module.exports = class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }

  static Unauthorized(message) {
    return new ApiError(UNAUTHORIZED, message);
  }

  static BadRequest(message) {
    return new ApiError(BAD_REQUEST, message);
  }
};
