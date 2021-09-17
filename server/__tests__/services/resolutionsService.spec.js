const ResolutionsService = require("../../src/components/resolutions/resolutionsService");
const patientStorage = require("../../src/components/repositories/patientStorage");
/**
 * vars
 */
const resolutionsService = new ResolutionsService();

/**
 * mocking funcs
 */
const storage = (resolutionsService.storage = jest.fn());
const name = "name";
storage.create = jest.fn();
storage.findPatientById = jest.fn();
storage.findById = jest.fn();
storage.findOne = jest.fn();
storage.findPatientByName = jest.fn();
storage.deleteByIdAndDoctorName = jest.fn();
patientStorage.findOne = jest.fn();
patientStorage.findPatientById = jest.fn();

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

    expect(await resolutionsService.add(1, "hello", 30, 412)).toBeUndefined();
    expect(storage.create).toHaveBeenCalledWith(1, "hello", 30, 412);
    expect(storage.create).toHaveBeenCalledTimes(1);

    await catchBlockTest("create", resolutionsService.add);
  });

  it("'get' method, if 'name' doesn't exist in DB", async () => {
    patientStorage.findPatientById.mockResolvedValue(null);

    expect(
      await resolutionsService.getPatientResolutions(
        "mia",
        "patient",
        "1Ad3322Fd3"
      )
    ).toBeNull();
    expect(patientStorage.findPatientById).toHaveBeenCalledWith("1Ad3322Fd3");
    expect(patientStorage.findPatientById).toHaveBeenCalledTimes(1);
    expect(storage.findOne).toHaveBeenCalledTimes(0);
  });

  const value = { patient_id: 1, name: "mia", id: 99 };
  const resolution = [
    { resolution: "resolution" },
    { resolution: "resolution2" },
  ];
  it("'get' method, if the 'name' is in the DB and the 'patientId' in the storage", async () => {
    patientStorage.findPatientById.mockResolvedValue(value);
    storage.findById.mockResolvedValue([
      { resolution: "resolution" },
      { resolution: "resolution2" },
    ]);

    expect(
      await resolutionsService.getPatientResolutions("mia", "patient", 2)
    ).toEqual(resolution);
    expect(patientStorage.findPatientById).toHaveBeenCalledTimes(1);
    expect(storage.findById).toHaveBeenCalledTimes(1);

    await catchBlockTest("findById", resolutionsService.getPatientResolutions);
  });

  it("'getPatientResolutions' method, if the 'name' is in the DB and the 'patientId' isn't in the storage", async () => {
    storage.findPatientById.mockResolvedValue(null);
    await catchBlockTest(
      "findPatientById",
      resolutionsService.getPatientResolutions
    );
  });

  it("'delete' method, if the 'patientId' is in the storage", async () => {
    storage.deleteByIdAndDoctorName.mockResolvedValue(1);

    expect(await resolutionsService.delete(99, name)).toEqual(1);
    expect(storage.deleteByIdAndDoctorName).toHaveBeenCalledWith(99, name);
    expect(storage.deleteByIdAndDoctorName).toHaveBeenCalledTimes(1);

    await catchBlockTest("deleteByIdAndDoctorName", resolutionsService.delete);
  });

  it("'delete' method, if the 'patientId' isn't in the storage ", async () => {
    storage.deleteByIdAndDoctorName.mockResolvedValue(0);
    expect(await resolutionsService.delete(99)).toBeNull();
  });
});
