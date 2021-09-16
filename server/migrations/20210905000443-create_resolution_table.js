module.exports = {
  up: async (queryInterface, DataTypes) => {
    queryInterface.createTable("resolution", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "patient",
          },
          key: "id",
        },
        allowNull: false,
      },
      resolution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "doctor",
          },
          key: "id",
        },
        allowNull: false,
      },
      expire_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.dropTable("resolution");
  },
};
