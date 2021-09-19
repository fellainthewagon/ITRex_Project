module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("user", "role", { type: DataTypes.STRING });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.removeColumn("user", "role");
  },
};
