const { UNSUPPORTED_TYPE } = require("../../constants/statusMessage");
const Memory = require("./memory");
const Redis = require("./redis");

module.exports = class Factory {
  static create(storageType) {
    try {
      switch (storageType) {
        case "redis":
          return new Redis();

        case "memory":
          return new Memory();

        default:
          throw UNSUPPORTED_TYPE;
      }
    } catch (error) {
      throw Error(error);
    }
  }
};
