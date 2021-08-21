module.exports = {
  DB: "clinic",
  USER: "fella",
  PASSWORD: "fella",
  HOST: "127.0.0.1",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
