module.exports = class CatchError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }
};
