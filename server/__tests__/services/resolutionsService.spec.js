const resolutionsService = require("../../src/components/resolutions/resolutionsService");
const { Patient } = require("../../src/db");

/**
 * mocking funcs
 */
const storage = (resolutionsService.storage = jest.fn());
storage.create = jest.fn();
storage.findById = jest.fn();
storage.deleteById = jest.fn();
Patient.findOne = jest.fn();

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(storage, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  storage[method].mockRestore();
}

/**
 * TEST
 */
describe("'ResolutionsService' class", () => {
  it("'add' method", async () => {
    storage.create.mockResolvedValue();

    expect(await resolutionsService.add(1, "hello", 30)).toBeUndefined();
    expect(storage.create).toHaveBeenCalledWith(1, "hello", 30);
    expect(storage.create).toHaveBeenCalledTimes(1);

    await catchBlockTest("create", resolutionsService.add);
  });

  it("'get' method, if 'name' doesn't exist in DB", async () => {
    Patient.findOne.mockResolvedValue(null);

    expect(await resolutionsService.get("mia")).toBeNull();
    expect(Patient.findOne).toHaveBeenCalledWith({ where: { name: "mia" } });
    expect(Patient.findOne).toHaveBeenCalledTimes(1);
    expect(storage.findById).toHaveBeenCalledTimes(0);
  });

  const value = { patientId: 1, name: "mia", id: 99 };
  it("'get' method, if the 'name' is in the DB and the 'patientId' in the storage", async () => {
    Patient.findOne.mockResolvedValue({ id: 1, name: "mia" });
    storage.findById.mockResolvedValue(value);

    expect(await resolutionsService.get("mia")).toEqual(value);
    expect(storage.findById).toHaveBeenCalledTimes(1);
    expect(storage.findById).toHaveBeenCalledWith(1);

    await catchBlockTest("findById", resolutionsService.get);
  });

  it("'get' method, if the 'name' is in the DB and the 'patientId' isn't in the storage", async () => {
    storage.findById.mockResolvedValue(null);
    expect(await resolutionsService.get("mia")).toBeNull();
  });

  it("'delete' method, if the 'patientId' is in the storage", async () => {
    storage.deleteById.mockResolvedValue(1);

    expect(await resolutionsService.delete(99)).toEqual(1);
    expect(storage.deleteById).toHaveBeenCalledWith(99);
    expect(storage.deleteById).toHaveBeenCalledTimes(1);

    await catchBlockTest("deleteById", resolutionsService.delete);
  });

  it("'delete' method, if the 'patientId' isn't in the storage ", async () => {
    storage.deleteById.mockResolvedValue(0);
    expect(await resolutionsService.delete(99)).toBeNull();
  });
});
