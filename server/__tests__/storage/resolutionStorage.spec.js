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

const fullValue = {
  dataValues: rawValue,
  expire_timestamp: 1000,
  destroy: jest.fn(),
};

const condition = { where: { patient_id: 99 } };

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
    db.Resolution.findOne.mockResolvedValue(null);

    expect(await resolutionStorage.findById(99)).toBeNull();
    expect(db.Resolution.findOne).toHaveBeenCalledTimes(1);
    expect(db.Resolution.findOne).toHaveBeenCalledWith(condition);
  });

  it("'findById' method, if the 'resolution' found but the 'TTL' has expired", async () => {
    db.Resolution.findOne.mockResolvedValue(fullValue);
    Date.now.mockReturnValue(1001);

    expect(await resolutionStorage.findById(99)).toBeNull();
    expect(fullValue.destroy).toHaveBeenCalledTimes(1);
  });

  it("'findById' method, if the 'resolution' found and the 'TTL' hasn't expired", async () => {
    db.Resolution.findOne.mockResolvedValue(fullValue);
    Date.now.mockReturnValue(999);

    expect(await resolutionStorage.findById(99)).toEqual(rawValue);
    expect(fullValue.destroy).toHaveBeenCalledTimes(0);

    catchBlockTest("findOne", resolutionStorage.findById);
  });

  it("'deleteById' method, when 'resolution' is successfully deleted or not found", async () => {
    db.Resolution.destroy.mockResolvedValue(1);

    expect(await resolutionStorage.deleteById(99)).toBe(1);
    expect(db.Resolution.destroy).toHaveBeenCalledTimes(1);
    expect(db.Resolution.destroy).toHaveBeenCalledWith(condition);

    db.Resolution.destroy.mockResolvedValue(0);
    expect(await resolutionStorage.deleteById(99)).toBe(0);

    catchBlockTest("destroy", resolutionStorage.deleteById);
  });
});
