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

db.Patient.hasMany(db.Resolution, {
  onDelete: "cascade",
  foreignKey: "patient_id",
  as: "resolution",
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

<<<<<<< HEAD
db.User.hasOne(db.Doctor, { foreignKey: "user_id", as: "doctor" });
db.Doctor.belongsTo(db.User, { foreignKey: "id", as: "user" });

db.Doctor.belongsTo(db.Specialization, {
  as: "specialization",
  foreignKey: "specialization_id",
});
db.Specialization.hasMany(db.Doctor, {
  as: "doctor",
  foreignKey: "specialization_id",
});
db.Doctor.hasMany(db.Resolution, {
  foreignKey: "doctor_id",
  as: "resolution",
});
db.Resolution.belongsTo(db.Doctor, {
  foreignKey: "doctor_id",
  as: "doctor",
});

=======
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
