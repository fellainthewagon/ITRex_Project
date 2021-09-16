module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user",
      [
        {
          id: "dba35030-145d-11ec-88a6-671ebb3b8072",
          email: "therapist@mail.ru",
          password:
            "$2a$10$Mi0CYCYZNjWdm7xWdR/0nu9N66wwHEBcn8wbkliXoUAcRhGh1ZBue",
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ef9dced0-1462-11ec-8f7f-3100de2fc697",
          email: "surgeon@mail.ru",
          password:
            "$2a$10$p4eZOH5gjL..WNqC8DKS4eqs4zmhdDdFewflO2YuRkCI1V52OpP4i",
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f031d170-1462-11ec-8f7f-3100de2fc697",
          email: "dentist@mail.ru",
          password:
            "$2a$10$/xW0MJwtTwZ7EXq9BpBdteLjoOy5yVMmHRIiSI.4UAaHif67mPXea",
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
          specialization: "surgeon",
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
          name: "John Jones",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          user_id: "ef9dced0-1462-11ec-8f7f-3100de2fc697",
          specialization_id: 2,
          name: "Stas Mihailov",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          user_id: "f031d170-1462-11ec-8f7f-3100de2fc697",
          specialization_id: 3,
          name: "Conor McGregor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // await queryInterface.bulkInsert(
    //   "user",
    //   [
    //     {
    //       id: "ef9dced0-1462-11ec-8f7f-3100de2fc697",
    //       email: "surgeon@mail.ru",
    //       password:
    //         "$2a$10$p4eZOH5gjL..WNqC8DKS4eqs4zmhdDdFewflO2YuRkCI1V52OpP4i",
    //       role: "doctor",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   "doctor",
    //   [
    //     {
    //       id: 2,
    //       user_id: "ef9dced0-1462-11ec-8f7f-3100de2fc697",
    //       specialization_id: 2,
    //       name: "Stas Mihailov",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   "specialization",
    //   [
    //     {
    //       id: 2,
    //       doctor_id: 2,
    //       specialization: "surgeon",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   "user",
    //   [
    //     {
    //       id: "f031d170-1462-11ec-8f7f-3100de2fc697",
    //       email: "dentist@mail.ru",
    //       password:
    //         "$2a$10$/xW0MJwtTwZ7EXq9BpBdteLjoOy5yVMmHRIiSI.4UAaHif67mPXea",
    //       role: "doctor",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   "doctor",
    //   [
    //     {
    //       id: 3,
    //       user_id: "f031d170-1462-11ec-8f7f-3100de2fc697",
    //       specialization_id: 3,
    //       name: "Conor McGregor",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   "specialization",
    //   [
    //     {
    //       id: 3,
    //       doctor_id: 3,
    //       specialization: "dentist",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
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
