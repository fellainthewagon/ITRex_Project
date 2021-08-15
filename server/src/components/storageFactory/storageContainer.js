const STORAGE_TYPE = require("../../library/storageType");
const {
  redisStorageProvider,
  memoryStorageProvider,
} = require("./storageProviders");

const container = new Map();

container.set(STORAGE_TYPE.MEMORY, memoryStorageProvider);
container.set(STORAGE_TYPE.REDIS, redisStorageProvider);

module.exports = container;
