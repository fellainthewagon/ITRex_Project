const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {}

  Specialization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      specialization: DataTypes.STRING,
    },

    {
      sequelize,
      tableName: "specialization",
      modelName: "specialization",
    }
  );

  return Specialization;
};
