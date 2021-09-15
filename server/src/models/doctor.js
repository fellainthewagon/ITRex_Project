const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {}

  Doctor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "doctor",
      modelName: "doctor",
    }
  );

  return Doctor;
};
