module.exports = class CatchError extends Error {
  constructor(error) {
    super(error.message);
    // global.console.log(error);

    if (error.statusCode) {
      this.statusCode = error.statusCode;
    }
  }
};
