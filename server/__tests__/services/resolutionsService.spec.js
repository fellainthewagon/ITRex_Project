const ResolutionsService = require("../../src/components/resolutions/resolutionsService");
const patientStorage = require("../../src/components/repositories/patientStorage");
const {
  PATIENT_NOT_FOUND,
  RESOLUTION_NOT_FOUND,
} = require("../../src/constants");

/**
 * vars
 */
const resolutionsService = new ResolutionsService();

/**
 * mocking funcs
 */
const storage = (resolutionsService.storage = jest.fn());
storage.create = jest.fn();
storage.findById = jest.fn();
storage.delete = jest.fn();
patientStorage.getPatientsByName = jest.fn();

const patientId = 1;
const doctorId = 1;
const resolution = "patient resolution";
const ttl = 30000;
const name = "Mia Walles";
const params = { id: 1, patientId: 1 };

const patients = [
  {
    id: 2,
    user_id: "6f3a37a0-1733-11ec-9d22-6f63ac278d86",
    name: "mia vega",
    dob: "2020-02-20T00:00:00.000Z",
    gender: "female",
    createdAt: "2021-09-16T21:17:01.000Z",
    updatedAt: "2021-09-16T21:17:01.000Z",
  },
];
const resolutionsDto = [
  {
    patientId: 2,
    name: "mia vega",
    gender: "female",
    dob: "2020-02-20T00:00:00.000Z",
    resolutionId: 2,
    resolution: "999999999",
    createdData: "2021-09-16T23:08:48.000Z",
    doctorName: "John Jones",
    doctorSpecialization: "therapist",
  },
];
const resolutions = [
  {
    id: 2,
    patient_id: 2,
    resolution: "999999999",
    doctor_id: 1,
    expire_timestamp: 1631836728747,
    createdAt: "2021-09-16T23:08:48.000Z",
    updatedAt: "2021-09-16T23:08:48.000Z",
    "doctor.id": 1,
    "doctor.user_id": "dba35030-145d-11ec-88a6-671ebb3b8072",
    "doctor.name": "John Jones",
    "doctor.createdAt": "2021-09-16T19:41:33.000Z",
    "doctor.updatedAt": "2021-09-16T19:41:33.000Z",
    "doctor.specialization_id": 1,
    "doctor.specialization.id": 1,
    "doctor.specialization.specialization": "therapist",
    "doctor.specialization.doctor_id": 1,
    "doctor.specialization.createdAt": "2021-09-16T19:41:33.000Z",
    "doctor.specialization.updatedAt": "2021-09-16T19:41:33.000Z",
  },
];

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

    expect(
      await resolutionsService.add(patientId, resolution, doctorId, ttl)
    ).toBeUndefined();
    expect(storage.create).toHaveBeenCalledWith(
      patientId,
      resolution,
      doctorId,
      ttl
    );
    expect(storage.create).toHaveBeenCalledTimes(1);

    await catchBlockTest("create", resolutionsService.add);
  });

  it("'getResolutions' method, if patient 'name' doesn't exist in DB", async () => {
    patientStorage.getPatientsByName.mockResolvedValue(null);

    await expect(resolutionsService.getResolutions(name)).rejects.toThrowError(
      PATIENT_NOT_FOUND
    );
    expect(patientStorage.getPatientsByName).toHaveBeenCalledWith(name);
    expect(patientStorage.getPatientsByName).toHaveBeenCalledTimes(1);
    expect(storage.findById).toHaveBeenCalledTimes(0);
  });

  it("'getResolutions' method, if two or more patients are in the DB", async () => {
    const patients = [{ name: "One" }, { name: "Two" }];
    patientStorage.getPatientsByName.mockResolvedValue(patients);

    expect(await resolutionsService.getResolutions(name)).toEqual({ patients });
  });

  it("'getResolutions' method, if one patient is in DB and he has resolutions", async () => {
    patientStorage.getPatientsByName.mockResolvedValue(patients);
    storage.findById.mockResolvedValue(resolutions);

    expect(await resolutionsService.getResolutions(name)).toEqual({
      resolutions: resolutionsDto,
    });
    expect(storage.findById).toHaveBeenCalledWith(patients[0].id);
    expect(storage.findById).toHaveBeenCalledTimes(1);

    await catchBlockTest("findById", resolutionsService.getResolutions);
  });

  it("'getResolutions' method, if no resolutions in DB", async () => {
    patientStorage.getPatientsByName.mockResolvedValue(patients);
    storage.findById.mockResolvedValue(null);

    await expect(resolutionsService.getResolutions(name)).rejects.toThrowError(
      RESOLUTION_NOT_FOUND
    );
    expect(storage.findById).toHaveBeenCalledWith(patients[0].id);
    expect(storage.findById).toHaveBeenCalledTimes(1);
  });

  it("'delete' method, if the resolution is deleted", async () => {
    storage.delete.mockResolvedValue(1);

    expect(await resolutionsService.delete(params, doctorId)).toBe(1);
    expect(storage.delete).toHaveBeenCalledWith(params, doctorId);
    expect(storage.delete).toHaveBeenCalledTimes(1);

    await catchBlockTest("delete", resolutionsService.delete);
  });

  it("'delete' method, if the 'patientId' isn't in the storage ", async () => {
    storage.delete.mockResolvedValue(0);

    await expect(
      resolutionsService.delete(params, doctorId)
    ).rejects.toThrowError(RESOLUTION_NOT_FOUND);
  });
});
