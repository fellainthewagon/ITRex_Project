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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expire_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          name: "resolution_id_patient_id_doctor_id",
          fields: ["id", "patient_id", "doctor_id"],
        },
      ],
      sequelize,
      tableName: "resolution",
      modelName: "Resolution",
    }
  );

  return Resolution;
};
