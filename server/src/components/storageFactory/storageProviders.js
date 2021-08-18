const ResolutionMemoryStorage = require("../resolutions/resolutionMemoryStorage");
const ResolutionRedisStorage = require("../resolutions/resolutionRedisStorage");
const QueueMemoryStorage = require("../queue/queueMemoryStorage");
const QueueRedisStorage = require("../queue/queueRedisStorage");

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
