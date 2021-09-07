const QueueRedis = require("./queueRedis");
const QueueMemory = require("./queueMemory");
const { UNSUPPORTED_TYPE } = require("../../../constants");

module.exports = class QueueFactory {
  static create(storageType) {
    try {
      switch (storageType) {
        case "redis":
          return new QueueRedis();

        case "memory":
          return new QueueMemory();

        default:
          throw UNSUPPORTED_TYPE;
      }
    } catch (error) {
      throw Error(error);
    }
  }
};
