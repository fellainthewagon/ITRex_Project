module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("specialization", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      specialization: DataTypes.STRING,
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.dropTable("specialization");
  },
};
