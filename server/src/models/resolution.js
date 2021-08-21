const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Resolution extends Model {
    static associate({ Patient }) {
      this.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, uuid: undefined };
    }
  }

  Resolution.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      resolution: {
        type: DataTypes.TEXT,
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
