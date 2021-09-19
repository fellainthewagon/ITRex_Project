module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "user",
      {
        id: {
          allowNull: false,
          type: DataTypes.UUID,
          primaryKey: true,
          validate: {
            notNull: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: "email",
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        uniqueKeys: {
          email: {
            customIndex: true,
            fields: ["email"],
          },
        },
      }
    );
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.dropTable("user");
  },
};
