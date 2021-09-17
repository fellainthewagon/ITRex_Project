const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Resolution extends Model {}

  Resolution.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resolution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.STRING,
        references: {
          model: {
            tableName: "doctor",
          },
          key: "id",
        },
        allowNull: false,
      },
      expire_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "resolution",
      modelName: "Resolution",
    }
  );

  return Resolution;
};
