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
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          name: "name",
          unique: true,
          fields: ["name"],
        },
        // {
        //   name: "user_id",
        //   fields: ["user_id"],
        // },
      ],
      sequelize,
      tableName: "patient",
      modelName: "Patient",
    }
  );

  return Patient;
};
