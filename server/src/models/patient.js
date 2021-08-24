const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      tableName: "patients",
      modelName: "Patient",
    }
  );

  return Patient;
};
