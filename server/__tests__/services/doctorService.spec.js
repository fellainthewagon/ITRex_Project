const doctorService = require("../../src/components/doctor/doctorService");
const doctorStorage = require("../../src/components/repositories/doctorStorage");
const { DOCTOR_NOT_FOUND } = require("../../src/constants");

doctorStorage.getDoctorByUserId = jest.fn();
const doctorData = { name: "name", id: 2 };
const id = 2;

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(doctorStorage, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  doctorStorage[method].mockRestore();
}

describe("'doctorStorage' class", () => {
  it("'getDoctorData' method, if doctor is exist", async () => {
    doctorStorage.getDoctorByUserId.mockResolvedValue(doctorData);

    expect(await doctorService.getDoctorData(id)).toEqual(doctorData);
    expect(doctorStorage.getDoctorByUserId).toHaveBeenCalledTimes(1);
    expect(doctorStorage.getDoctorByUserId).toBeCalledWith(id);
  });

  it("'getDoctorData' method, if doctor doesn't exist", async () => {
    doctorStorage.getDoctorByUserId.mockResolvedValue(null);

    await expect(doctorService.getDoctorData(id)).rejects.toThrowError(
      DOCTOR_NOT_FOUND
    );
    await catchBlockTest("getDoctorByUserId", doctorStorage.getDoctorByUserId);
  });
});
