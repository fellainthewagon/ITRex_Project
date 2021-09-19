const ResolutionStorage = require("../../src/components/resolutions/resolutionRepositories/resolutionStorage");

const resolutionStorage = new ResolutionStorage();

/**
 * mocking funcs
 */
jest.mock("../../src/db");
const db = require("../../src/db");

Date.now = jest.fn();

/**
 *  vars
 */
const rawValue = {
  patient_id: 99,
  resolution: "hello",
  expire_timestamp: 1000,
};

const rawValue2 = {
  patient_id: 99,
  resolution: "hello",
  expire_timestamp: 2000,
};

const fullValue = {
  dataValues: rawValue,
  expire_timestamp: 1000,
  destroy: jest.fn(),
};

const fullValue2 = {
  dataValues: rawValue2,
  expire_timestamp: 2000,
  destroy: jest.fn(),
};

const condition = { where: { doctor_id: 33, patient_id: 99 } };
const findCondition = {
  where: { patient_id: 99 },
  include: {
    model: db.Doctor,
    as: "doctor",
    include: {
      model: db.Specialization,
      as: "specialization",
    },
  },
};
const TTL = 30;

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(db.Resolution, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  db.Resolution[method].mockRestore();
}

/**
 * TEST
 */
describe("'ResolutionStorage' class", () => {
  it("'create' method", async () => {
    Date.now.mockReturnValue(1000);

    expect(await resolutionStorage.create(99, "hello", TTL)).toBeUndefined();
    expect(db.Resolution.create).toHaveBeenCalledTimes(1);
    expect(db.Resolution.create).toHaveBeenCalledWith({
      ...rawValue,
      expire_timestamp: Date.now() + TTL * 1000,
    });

    catchBlockTest("create", resolutionStorage.create);
  });

  it("'findById' method, if the 'resolution' not found in the DB", async () => {
    db.Resolution.findAll.mockResolvedValue(null);

    expect(await resolutionStorage.findById(99)).toBeNull();
    expect(db.Resolution.findAll).toHaveBeenCalledTimes(1);
    expect(db.Resolution.findAll).toHaveBeenCalledWith(findCondition);
  });

  it("'findById' method, if the 'resolution' not found", async () => {
    db.Resolution.findAll.mockResolvedValue(null);
    Date.now.mockReturnValue(1001);
    expect(await resolutionStorage.findById(99)).toBeNull();
    expect(db.Resolution.findAll).toHaveBeenCalledTimes(1);
    catchBlockTest("findAll", resolutionStorage.findById);
  });

  it("'findById' method, if the 'resolution' found", async () => {
    db.Resolution.findAll.mockResolvedValue([fullValue2, fullValue]);
    Date.now.mockReturnValue(1001);
    expect(await resolutionStorage.findById(99)).toEqual([fullValue2, null]);
  });

  it("'deleteByIdAndDoctorName' method, when 'resolution' is successfully deleted or not found", async () => {
    db.Resolution.destroy.mockResolvedValue(1);

    expect(await resolutionStorage.deleteByIdAndDoctorName(99, 33)).toBe(1);
    expect(db.Resolution.destroy).toHaveBeenCalledTimes(1);
    expect(db.Resolution.destroy).toHaveBeenCalledWith(condition);

    db.Resolution.destroy.mockResolvedValue(0);
    expect(await resolutionStorage.deleteByIdAndDoctorName(99)).toBe(0);
    catchBlockTest("destroy", resolutionStorage.deleteByIdAndDoctorName);
  });
});
