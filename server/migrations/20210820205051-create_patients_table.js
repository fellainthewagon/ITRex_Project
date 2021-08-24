// const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "patients",
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
          unique: "name",
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        uniqueKeys: {
          name: {
            customIndex: true,
            fields: ["name"],
          },
        },
      }
    );
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.dropTable("patients");
  },
};
