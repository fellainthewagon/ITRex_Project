const ResolutionStorage = require("../../src/components/resolutions/resolutionRepositories/resolutionStorage");
const { Doctor } = require("../../src/db");

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

const fullValue = {
  patient_id: 99,
  resolution: "hello",
  expire_timestamp: 1000,
};
const id = 1;
const resolution = "resolution 123";
const doctorId = 1;
const ttl = 1000;
const findCondition = {
  where: { patient_id: id },
  include: [
    {
      model: Doctor,
      as: "doctor",
      include: ["specialization"],
    },
  ],
  required: false,
  raw: true,
};
const resolutionId = 1;

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
    db.Resolution.create.mockResolvedValue();
    const timestamp = 1001000;

    expect(
      await resolutionStorage.create(id, resolution, doctorId, ttl)
    ).toBeUndefined();
    expect(db.Resolution.create).toHaveBeenCalledTimes(1);
    expect(db.Resolution.create).toHaveBeenCalledWith({
      patient_id: id,
      resolution,
      doctor_id: doctorId,
      expire_timestamp: timestamp,
    });

    catchBlockTest("create", resolutionStorage.create);
  });

  it("'findById' method, if 'resolutions' not found in the DB", async () => {
    db.Resolution.findAll.mockResolvedValue([]);

    expect(await resolutionStorage.findById(id)).toBeNull();
    expect(db.Resolution.findAll).toHaveBeenCalledTimes(1);
    expect(db.Resolution.findAll).toHaveBeenCalledWith(findCondition);
  });

  it("'findById' method, if 'resolutions' found", async () => {
    db.Resolution.findAll.mockResolvedValue([fullValue]);
    Date.now.mockReturnValue(1001);

    expect(await resolutionStorage.findById(id)).toEqual([fullValue]);

    catchBlockTest("findAll", resolutionStorage.findById);
  });

  it("'delete' method, when 'resolution' is successfully deleted or not found", async () => {
    db.Resolution.destroy.mockResolvedValue(1);

    expect(await resolutionStorage.delete({ id, resolutionId }, doctorId)).toBe(
      1
    );
    expect(db.Resolution.destroy).toHaveBeenCalledTimes(1);
    expect(db.Resolution.destroy).toHaveBeenCalledWith({
      where: { id: resolutionId, doctor_id: doctorId, patient_id: id },
    });

    db.Resolution.destroy.mockResolvedValue(0);
    expect(await resolutionStorage.delete(99)).toBe(0);

    catchBlockTest("destroy", resolutionStorage.delete);
  });
});
