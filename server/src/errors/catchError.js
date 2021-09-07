module.exports = class CatchError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
};
