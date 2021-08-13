module.exports = class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
