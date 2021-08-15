require("dotenv").config();
const STORAGE_TYPE = require("../src/library/storageType");

const config = {
  mode: process.env.NODE_ENV || "dev",
  app: {
    port: parseInt(process.env.DEV_PORT, 10) || 3000,
    host: process.env.DEV_HOST || "0.0.0.0",
    ttl: parseInt(process.env.TTL, 10) || 30,
  },
};

const storage = {
  memory: { type: STORAGE_TYPE.MEMORY },
  redis: {
    type: STORAGE_TYPE.REDIS,
    port: parseInt(process.env.DEV_REDIS_PORT, 10) || 6379,
    host: process.env.DEV_REDIS_HOST || "127.0.0.1",
  },
};

config.storage = storage[process.env.STORAGE];

module.exports = config;
