module.exports = {
  DB: process.env.DB_NAME || "clinic",
  USER: process.env.DB_USER || "fella",
  PASSWORD: process.env.DB_PASSWORD || "fella",
  HOST: process.env.DB_HOST || "127.0.0.1",
  PORT: process.env.DB_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
