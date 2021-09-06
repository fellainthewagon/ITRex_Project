const patientStorage = require("../../src/components/storage/patientStorage");

/**
 * mocking funcs
 */
jest.mock("../../src/db");
const db = require("../../src/db");

/**
 * vars
 */
const name = "mia";
const id = "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3";
const patient = {
  id: 1,
  user_id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  name: "mia",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
};

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'PatientStorage' class", () => {
  it("'findOrCreate' method", async () => {
    db.Patient.findOrCreate.mockResolvedValue(patient);

    expect(await patientStorage.findOrCreate(name, id)).toBeUndefined();
    expect(db.Patient.findOrCreate).toHaveBeenCalledWith({
      where: { name },
      defaults: { user_id: id },
    });
    expect(db.Patient.findOrCreate).toHaveBeenCalledTimes(1);
  });

  it("'findOnefindOne' method", async () => {
    db.Patient.findOne.mockResolvedValue(patient);

    expect(await patientStorage.findOne(name)).toEqual(patient);
    expect(db.Patient.findOne).toHaveBeenCalledWith({ where: { name } });
    expect(db.Patient.findOne).toHaveBeenCalledTimes(1);
  });
});
