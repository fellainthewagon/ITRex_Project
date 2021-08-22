const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: dbConfig.dialect,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  pool: dbConfig.pool,
  define: { raw: true },
});

const db = {};

db.Patient = require("./models/patient")(sequelize, Sequelize.DataTypes);
db.Resolution = require("./models/resolution")(sequelize, Sequelize.DataTypes);

db.Patient.hasMany(db.Resolution, {
  onDelete: "cascade",
  foreignKey: "patientId",
  as: "resolutions",
});
db.Resolution.belongsTo(db.Patient, { foreignKey: "patientId", as: "patient" });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
