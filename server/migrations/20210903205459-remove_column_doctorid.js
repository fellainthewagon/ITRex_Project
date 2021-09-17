module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn("specialization", "doctor_id");
  },
};
