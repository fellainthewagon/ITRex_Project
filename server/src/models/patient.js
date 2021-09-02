const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {}

  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Patient must have a name" },
        },
        unique: true,
      },
    },
    {
      indexes: [
        {
          name: "name",
          unique: true,
          fields: ["name"],
        },
      ],
      sequelize,
      tableName: "patient",
      modelName: "Patient",
    }
  );

  return Patient;
};
