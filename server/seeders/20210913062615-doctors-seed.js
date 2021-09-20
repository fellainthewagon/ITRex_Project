module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user",
      [
        {
          id: "dba35030-145d-11ec-88a6-671ebb3b8072",
          email: "vitalik@clinic.com",
          password:
            "$2a$10$NkQ.mGkeK91s860al6XnIOV6RxVkkhNYNqlaok/X3zlo39P0D2lly",
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ef9dced0-1462-11ec-8f7f-3100de2fc697",
          email: "oreo@clinic.com",
          password:
            "$2a$10$NkQ.mGkeK91s860al6XnIOV6RxVkkhNYNqlaok/X3zlo39P0D2lly",
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f031d170-1462-11ec-8f7f-3100de2fc697",
          email: "corben@clinic.com",
          password:
            "$2a$10$NkQ.mGkeK91s860al6XnIOV6RxVkkhNYNqlaok/X3zlo39P0D2lly",
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "specialization",
      [
        {
          id: 1,
          doctor_id: 1,
          specialization: "therapist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          doctor_id: 2,
          specialization: "neurologist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          doctor_id: 3,
          specialization: "dentist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "doctor",
      [
        {
          id: 1,
          user_id: "dba35030-145d-11ec-88a6-671ebb3b8072",
          specialization_id: 1,
          name: "Vitalik Buterin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          user_id: "ef9dced0-1462-11ec-8f7f-3100de2fc697",
          specialization_id: 2,
          name: "Oreo Biscuit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          user_id: "f031d170-1462-11ec-8f7f-3100de2fc697",
          specialization_id: 3,
          name: "Korben Dallas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
