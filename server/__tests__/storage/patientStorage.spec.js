const { Op } = require("sequelize");
const patientStorage = require("../../src/components/repositories/patientStorage");

/**
 * mocking funcs
 */
jest.mock("../../src/db");
const db = require("../../src/db");

/**
 * vars
 */
const dob = "1972-01-09T00:00:00.000Z";
const gender = "female";
const name = "user user";
const id = "9627aeb0-17e7-11ec-8a8a-95895ec7e17f";
const userId = "wqe2332d32";
const patient = [
  {
    id: 3,
    user_id: "9627aeb0-17e7-11ec-8a8a-95895ec7e17f",
    name: "user user",
    dob: "2020-02-20T00:00:00.000Z",
    gender: "male",
    createdAt: "2021-09-17T18:46:36.000Z",
    updatedAt: "2021-09-17T18:46:36.000Z",
  },
];
const reqBody = {
  email: "mia@mail.ru",
  password: "123123",
  name: "user user",
  dob: "1972-01-09T00:00:00.000Z",
  gender: "female",
};

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'PatientStorage' class", () => {
  it("'create' method", async () => {
    db.Patient.create.mockResolvedValue();

    expect(await patientStorage.create(reqBody, id)).toBeUndefined();
    expect(db.Patient.create).toHaveBeenCalledWith({
      name,
      user_id: id,
      dob,
      gender,
    });
    expect(db.Patient.create).toHaveBeenCalledTimes(1);
  });

  it("'getPatientsByName' method", async () => {
    db.Patient.findAll.mockResolvedValue(patient);

    expect(await patientStorage.getPatientsByName(name)).toEqual(patient);
    expect(db.Patient.findAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      raw: true,
    });
    expect(db.Patient.findAll).toHaveBeenCalledTimes(1);

    db.Patient.findAll.mockResolvedValue([]);
    expect(await patientStorage.getPatientsByName(name)).toBeNull();
  });

  it("'findPatientById' method", async () => {
    db.Patient.findOne.mockResolvedValue(patient[0]);

    expect(await patientStorage.findPatientById(userId)).toEqual(patient[0]);
    expect(db.Patient.findOne).toHaveBeenCalledWith({
      where: { user_id: userId },
    });
    expect(db.Patient.findOne).toHaveBeenCalledTimes(1);
  });

  it("'findPatientByName' method", async () => {
    db.Patient.findOne.mockResolvedValue(patient[0]);

    expect(await patientStorage.findPatientByName(name)).toEqual(patient[0]);
    expect(db.Patient.findOne).toHaveBeenCalledWith({
      where: { name },
      raw: true,
    });
    expect(db.Patient.findOne).toHaveBeenCalledTimes(1);
  });
});
