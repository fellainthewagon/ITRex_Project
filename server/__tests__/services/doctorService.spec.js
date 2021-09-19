const doctorService = require("../../src/components/doctor/doctorService");
const doctorStorage = require("../../src/components/repositories/doctorStorage");

beforeEach(() => jest.clearAllMocks());
const doctorData = { name: "name", id: 2 };
const id = 2;

describe("'doctorStorage' class", () => {
  it("'findSpecialization' method", async () => {
    doctorStorage.findSpecialization = jest.fn(() => doctorData);
    const doctor = await doctorService.getDoctorSpecializationByUserId(id);
    expect(doctorStorage.findSpecialization).toHaveBeenCalledTimes(1);
    expect(doctorStorage.findSpecialization).toBeCalledWith(id);
    expect(doctor).toEqual(doctorData);
  });
});

describe("'doctorStorage' class", () => {
  it("'findById' method", async () => {
    doctorStorage.findById = jest.fn(() => doctorData);
    const doc = await doctorService.getDoctorId(id);
    expect(doctorStorage.findById).toHaveBeenCalledTimes(1);
    expect(doctorStorage.findById).toBeCalledWith(id);
    expect(doc).toEqual(doctorData);
  });
});
