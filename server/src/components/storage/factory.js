const QueueRedis = require("./queueStorage/queueRedis");
const QueueMemory = require("./queueStorage/queueMemory");
const ResolutionRedis = require("./resolutionStorage/resolutionRedis");
const ResolutionMemory = require("./resolutionStorage/resolutionMemory");
const ResolutionDatabase = require("./resolutionStorage/resolutionDatabase");
const { UNSUPPORTED_TYPE } = require("../../constants");

module.exports = class Factory {
  static create(storageType) {
    try {
      switch (storageType) {
        case "queueRedis":
          return new QueueRedis();

        case "queueMemory":
          return new QueueMemory();

        case "resolutionRedis":
          return new ResolutionRedis();

        case "resolutionMemory":
          return new ResolutionMemory();

        case "resolutionDatabase":
          return new ResolutionDatabase();

        default:
          throw UNSUPPORTED_TYPE;
      }
    } catch (error) {
      throw Error(error);
    }
  }
};
