const ResolutionRedis = require("./resolutionRedis");
const ResolutionMemory = require("./resolutionMemory");
const ResolutionStorage = require("./resolutionStorage");
const { UNSUPPORTED_TYPE } = require("../../../constants");

module.exports = class ResolutionFactory {
  static create(storageType) {
    try {
      switch (storageType) {
        case "redis":
          return new ResolutionRedis();

        case "memory":
          return new ResolutionMemory();

        case "storage":
          return new ResolutionStorage();

        default:
          throw UNSUPPORTED_TYPE;
      }
    } catch (error) {
      throw Error(error);
    }
  }
};
