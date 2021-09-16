const {
  UNAUTHORIZED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require("http-status-codes");

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

  static DatabaseException(message) {
    return new ApiError(INTERNAL_SERVER_ERROR, message);
  }

  static NotFound(message) {
    return new ApiError(NOT_FOUND, message);
  }
};
