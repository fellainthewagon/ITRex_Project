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
  resolutionsStorage: process.env.RESOLUTIONS_STORAGE || "storage",
  queueStorage: process.env.QUEUE_STORAGE || "redis",
  accessTokenTTL: process.env.ACCESS_TOKEN_AGE || "3h",
  accessSecret: process.env.JWT_ACCESS_SECRET || "",
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
  accessTokenName: "accessToken",
  maxAgeRefresh: 30 * 24 * 60 * 60 * 1000,
  maxAgeAccess: 60 * 60 * 1000,
};

module.exports = config;
