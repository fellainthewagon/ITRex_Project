const Database = require("../../src/components/storage/database");
const DatabaseException = require("../../src/errors/databaseException");

jest.mock("../../src/db.js");
const db = require("../../src/db");

const database = new Database();
const dbFunction = (database.Resolution = db.Resolution);

/**
 * mocking funcs
 */
dbFunction.create = jest.fn();
dbFunction.findOne = jest.fn();
dbFunction.destroy = jest.fn();
Date.now = jest.fn();

/**
 *  vars
 */
const rawValue = {
  patientId: 99,
  resolution: "hello",
  timestamp: 1000,
};

const fullValue = {
  dataValues: rawValue,
  timestamp: 1000,
  destroy: jest.fn(),
};

const condition = { where: { patientId: 99 } };

const TTL = 30;

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(dbFunction, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  dbFunction[method].mockRestore();
}

/**
 * TEST
 */
describe("'Database' storage class", () => {
  it("'create' method", async () => {
    Date.now.mockReturnValue(1000);

    expect(await database.create(99, "hello", TTL)).toBeUndefined();
    expect(dbFunction.create).toHaveBeenCalledTimes(1);
    expect(dbFunction.create).toHaveBeenCalledWith({
      ...rawValue,
      timestamp: Date.now() + TTL * 1000,
    });

    catchBlockTest("create", database.create);
  });

  it("'findById' method, if the 'resolution' not found in the DB", async () => {
    dbFunction.findOne.mockResolvedValue(null);

    expect(await database.findById(99)).toBeNull();
    expect(dbFunction.findOne).toHaveBeenCalledTimes(1);
    expect(dbFunction.findOne).toHaveBeenCalledWith(condition);
  });

  it("'findById' method, if the 'resolution' found but the 'TTL' has expired", async () => {
    dbFunction.findOne.mockResolvedValue(fullValue);
    Date.now.mockReturnValue(1001);

    expect(await database.findById(99)).toBeNull();
    expect(fullValue.destroy).toHaveBeenCalledTimes(1);
  });

  it("'findById' method, if the 'resolution' found and the 'TTL' hasn't expired", async () => {
    dbFunction.findOne.mockResolvedValue(fullValue);
    Date.now.mockReturnValue(999);

    expect(await database.findById(99)).toEqual(rawValue);
    expect(fullValue.destroy).toHaveBeenCalledTimes(0);

    catchBlockTest("findOne", database.findById);
  });

  it("'deleteById' method, when 'resolution' is successfully deleted or not found", async () => {
    dbFunction.destroy.mockResolvedValue(1);

    expect(await database.deleteById(99)).toBe(1);
    expect(dbFunction.destroy).toHaveBeenCalledTimes(1);
    expect(dbFunction.destroy).toHaveBeenCalledWith(condition);

    dbFunction.destroy.mockResolvedValue(0);
    expect(await database.deleteById(99)).toBe(0);

    catchBlockTest("destroy", database.deleteById);
  });

  it("'DatabaseException' throwing", async () => {
    dbFunction.destroy.mockResolvedValue(() => {
      throw new DatabaseException();
    });
    expect(await database.deleteById(99)).toThrow(DatabaseException);
  });
});
