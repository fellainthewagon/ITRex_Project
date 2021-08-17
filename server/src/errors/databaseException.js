const StatusCodes = require("http-status-codes");
const { DATABASE_ERROR } = require("../library/statusMessage");

module.exports = class DatabaseException extends Error {
  constructor(error) {
    super(DATABASE_ERROR);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    global.console.error(error);
  }
};
