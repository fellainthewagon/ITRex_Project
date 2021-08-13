require("dotenv").config();

const config = {
  mode: process.env.NODE_ENV || "dev",
  app: {
    port: parseInt(process.env.DEV_PORT, 10) || 3000,
    host: process.env.DEV_HOST || "localhost",
    ttl: parseInt(process.env.TTL, 10) || 30000,
  },
};

module.exports = config;
