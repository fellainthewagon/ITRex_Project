const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate({ Resolution }) {
      this.hasMany(Resolution, {
        onDelete: "cascade",
        foreignKey: "patientId",
        as: "resolutions",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, uuid: undefined };
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
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Patient must have a name" },
        },
      },
    },
    {
      sequelize,
      tableName: "patients",
      modelName: "Patient",
    }
  );

  return Patient;
};
