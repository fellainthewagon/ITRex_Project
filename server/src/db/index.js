const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: dbConfig.dialect,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  pool: dbConfig.pool,
  define: { raw: true },
});

const db = {};

db.Patient = require("../models/patient")(sequelize, Sequelize.DataTypes);
db.Resolution = require("../models/resolution")(sequelize, Sequelize.DataTypes);
db.User = require("../models/user")(sequelize, Sequelize.DataTypes);
db.Doctor = require("../models/doctor")(sequelize, Sequelize.DataTypes);
db.Specialization = require("../models/specialization")(
  sequelize,
  Sequelize.DataTypes
);

db.Patient.hasMany(db.Resolution, {
  foreignKey: "patient_id",
  as: "resolution",
  onDelete: "cascade",
});
db.Resolution.belongsTo(db.Patient, {
  foreignKey: "patient_id",
  as: "patient",
});

db.User.hasOne(db.Patient, {
  foreignKey: "user_id",
  as: "patient",
  onDelete: "cascade",
});
db.Patient.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.User.hasOne(db.Doctor, { foreignKey: "user_id", as: "doctor" });
db.Doctor.belongsTo(db.User, { foreignKey: "id", as: "user" });

db.Specialization.hasMany(db.Doctor, {
  foreignKey: "specialization_id",
  as: "doctor",
  onDelete: "cascade",
});
db.Doctor.belongsTo(db.Specialization, {
  foreignKey: "specialization_id",
  as: "specialization",
});

db.Doctor.hasMany(db.Resolution, { as: "resolution", foreignKey: "doctor_id" });
db.Resolution.belongsTo(db.Doctor, { as: "doctor", foreignKey: "doctor_id" });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
