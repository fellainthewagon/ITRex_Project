const ResolutionMemoryStorage = require("../storageServices/memoryServices/resolutionMemoryStorage");
const ResolutionRedisStorage = require("../storageServices/redisServices/resolutionRedisStorage");
const QueueMemoryStorage = require("../storageServices/memoryServices/queueMemoryStorage");
const QueueRedisStorage = require("../storageServices/redisServices/queueRedisStorage");

const redis = require("../../redis");
const { resolution, queue } = require("../../../config");
const DatabaseException = require("../../errors/databaseException");
const closure = require("../../utils/closure");

exports.resolutionRedisStorageProvider = closure(
  resolution,
  redis,
  DatabaseException,
  ResolutionRedisStorage
);

exports.queueRedisStorageProvider = closure(
  queue,
  redis,
  DatabaseException,
  QueueRedisStorage
);

exports.resolutionMemoryStorageProvider = () => new ResolutionMemoryStorage();

exports.queueMemoryStorageProvider = () => new QueueMemoryStorage();
