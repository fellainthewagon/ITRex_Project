const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

module.exports = class DatabaseError extends Error {
  constructor(error) {
    super(error.message);
    global.console.log(error);
    this.statusCode = INTERNAL_SERVER_ERROR;
  }
};
