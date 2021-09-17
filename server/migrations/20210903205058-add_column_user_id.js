module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("patient", "user_id", {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "user",
        },
        key: "id",
      },
      after: "gender",
      allowNull: false,
    });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.removeColumn("patient", "user_id");
  },
};
