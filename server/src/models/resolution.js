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
      resolution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expire_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "resolutions",
      modelName: "Resolution",
    }
  );

  return Resolution;
};
