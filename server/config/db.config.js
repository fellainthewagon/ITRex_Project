module.exports = {
  DB: process.env.MYSQL_DATABASE || "clinic",
  USER: process.env.MYSQL_USER || "fella",
  PASSWORD: process.env.MYSQL_ROOT_PASSWORD || "fella",
  HOST: process.env.DB_HOST || "127.0.0.1",
  PORT: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
