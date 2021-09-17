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
const name = "mia";
const id = "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3";
const user_id = "wqe2332d32";
const patient = {
  id: 1,
  user_id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  name: "mia",
  dob: "1972-01-09T00:00:00.000Z",
  gender: "female",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
};
const reqBody = {
  email: "mia@mail.ru",
  password: "123123",
  name: "mia",
  dob: "1972-01-09T00:00:00.000Z",
  gender: "female",
};

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'PatientStorage' class", () => {
  it("'findOrCreate' method", async () => {
    db.Patient.findOrCreate.mockResolvedValue(patient);

    expect(await patientStorage.findOrCreate(reqBody, id)).toBeUndefined();
    expect(db.Patient.findOrCreate).toHaveBeenCalledWith({
      where: { name },
      defaults: { user_id: id, dob, gender },
    });
    expect(db.Patient.findOrCreate).toHaveBeenCalledTimes(1);
  });

  it("'findOne' method", async () => {
    db.Patient.findOne.mockResolvedValue(patient);

    expect(await patientStorage.findPatientByName(name)).toEqual(patient);
    expect(db.Patient.findOne).toHaveBeenCalledWith({ where: { name } });
    expect(db.Patient.findOne).toHaveBeenCalledTimes(1);
  });

  it("'findOne' method", async () => {
    db.Patient.findOne.mockResolvedValue(patient);

    expect(await patientStorage.findPatientById(user_id)).toEqual(patient);
    expect(db.Patient.findOne).toHaveBeenCalledWith({ where: { user_id } });
    expect(db.Patient.findOne).toHaveBeenCalledTimes(1);
  });
});
