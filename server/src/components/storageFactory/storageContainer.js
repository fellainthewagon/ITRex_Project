const storage = require("../../library/storageType");
const {
  resolutionRedisStorageProvider,
  resolutionMemoryStorageProvider,
  queueRedisStorageProvider,
  queueMemoryStorageProvider,
} = require("./storageProviders");

const container = new Map();

container.set(storage.REDIS_RESOLUTION, resolutionRedisStorageProvider);
container.set(storage.MEMORY_RESOLUTION, resolutionMemoryStorageProvider);
container.set(storage.REDIS_QUEUE, queueRedisStorageProvider);
container.set(storage.MEMORY_QUEUE, queueMemoryStorageProvider);

module.exports = container;
