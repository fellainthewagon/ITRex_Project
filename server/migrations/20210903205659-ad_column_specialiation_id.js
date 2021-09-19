module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("doctor", "specialization_id", {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "specialization",
        },
        key: "id",
      },
      after: "name",
      allowNull: false,
    });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.removeColumn("doctor", "specialization_id");
  },
};
