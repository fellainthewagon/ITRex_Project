const StatusCodes = require("http-status-codes");
const msg = require("../library/statusMessage");

module.exports = class DatabaseException extends Error {
  constructor(error) {
    super(msg.DATABASE_ERROR);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    global.console.error(error);
  }
};
