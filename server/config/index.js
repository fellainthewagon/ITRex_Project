const host = process.env.REDIS_HOST || "redis";
const port = parseInt(process.env.REDIS_PORT, 10) || 6379;

const config = {
  mode: process.env.NODE_ENV || "dev",
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || "0.0.0.0",
    ttl: parseInt(process.env.TTL, 10) || 30,
  },
  clientUrl: "http://localhost:5000",
  redis: { host, port },
  resolutionsStorage: process.env.RESOLUTIONS_STORAGE || "memory",
  queueStorage: process.env.QUEUE_STORAGE || "memory",
  accessTokenTTL: process.env.ACCESS_TOKEN_AGE || "3h",
  refreshTokenTTL: process.env.REFRESH_TOKEN_AGE || "30d",
  accessSecret:
    process.env.JWT_ACCESS_SECRET || "1CncgarOhEmEeux5SYpCC4NtpL8RU9sc",
  refreshSecret:
    process.env.JWT_REFRESH_SECRET || "TANiV1EhCjozaP2RdwmpADyAeYt9LU3g;",
};

module.exports = config;
