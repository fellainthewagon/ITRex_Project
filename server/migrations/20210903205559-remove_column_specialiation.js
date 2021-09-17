module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn("resolution", "specialization");
    await queryInterface.removeColumn("resolution", "doctor_name");
    await queryInterface.addColumn("resolution", "doctor_id", {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "doctor",
        },
        key: "id",
      },
      after: "resolution",
      allowNull: false,
    });
  },
};
