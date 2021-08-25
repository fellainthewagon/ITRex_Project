const { INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { DATABASE_ERROR } = require("../constants/statusMessage");

module.exports = class DatabaseException extends Error {
  constructor(error) {
    super(DATABASE_ERROR);
    this.statusCode = INTERNAL_SERVER_ERROR;
    // global.console.error(error);
  }
};
