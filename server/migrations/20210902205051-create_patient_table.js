module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "patient",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
<<<<<<< HEAD
=======
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
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: "name",
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM("male", "female"),
          allowNull: false,
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
    queryInterface.dropTable("patient");
  },
};
