const {
  REDIS_RESOLUTION,
  MEMORY_RESOLUTION,
  REDIS_QUEUE,
  MEMORY_QUEUE,
} = require("../src/library/storageType");

const config = {
  mode: process.env.NODE_ENV || "dev",
  app: {
    port: parseInt(process.env.DEV_PORT, 10) || 3000,
    host: process.env.DEV_HOST || "0.0.0.0",
    ttl: parseInt(process.env.TTL, 10) || 30,
  },
};

const host = process.env.DEV_REDIS_HOST || "127.0.0.1";
const port = parseInt(process.env.DEV_REDIS_PORT, 10) || 6379;

const resolution = {
  redis: {
    host,
    port,
    type: REDIS_RESOLUTION,
  },
  memory: { type: MEMORY_RESOLUTION },
};

const queue = {
  redis: {
    host,
    port,
    type: REDIS_QUEUE,
  },
  memory: { type: MEMORY_QUEUE },
};

config.resolution = resolution[process.env.RESOLUTION];
config.queue = queue[process.env.QUEUE];

module.exports = config;
