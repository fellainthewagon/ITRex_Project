const host = process.env.REDIS_HOST || "127.0.0.1";
const port = parseInt(process.env.REDIS_PORT, 10) || 6379;

const config = {
  mode: process.env.NODE_ENV || "dev",
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || "0.0.0.0",
    ttl: parseInt(process.env.TTL, 10) || 30,
  },
  redis: { host, port },
  resolutionsStorage: process.env.RESOLUTIONS,
  queueStorage: process.env.QUEUE,
};

module.exports = config;
