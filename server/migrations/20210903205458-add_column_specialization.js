module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("resolution", "specialization", {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn("resolution", "doctor_name", {
      type: DataTypes.STRING,
    });
  },
  down: async (queryInterface, DataTypes) => {
    queryInterface.removeColumn("resolution", "specialization");
    queryInterface.removeColumn("resolution", "doctor_name");
  },
};
