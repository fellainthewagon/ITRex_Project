// const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    queryInterface.createTable("resolutions", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      resolution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.dropTable("resolutions");
  },
};
