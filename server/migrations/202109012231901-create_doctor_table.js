module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("doctor", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "user",
          },
          key: "id",
        },
        allowNull: false,
      },
      name: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.dropTable("doctor");
  },
};
