const MemoryStorage = require("../storageServices/memoryStorage");
const RedisStorage = require("../storageServices/redisStorage");

const redis = require("../../redis");
const DatabaseException = require("../../errors/databaseException");
const { storage } = require("../../../config");

// create redis provider
function redisClosureFunction(storageData, redisDB, exception) {
  return () => new RedisStorage(storageData, redisDB, exception);
}
const redisStorageProvider = redisClosureFunction(
  storage,
  redis,
  DatabaseException
);

// create in-memory provider
const memoryStorageProvider = () => new MemoryStorage();

module.exports = { redisStorageProvider, memoryStorageProvider };
