const doctorService = require("../../src/components/doctor/doctorService");
const doctorStorage = require("../../src/components/repositories/doctorStorage");
const id = 2;
const object = { doctor_id: "1" };
const specialization = { specialization: "dentist" };
doctorStorage.findById = jest.fn(() => object);
doctorStorage.findSpecialization = jest.fn(() => specialization);

describe("'doctorService' class", () => {
  it("'getDoctorId' method", async () => {
    const doctor = await doctorService.getDoctorId(id);
    expect(doctorStorage.findById).toHaveBeenCalledTimes(1);
    expect(doctorStorage.findById).toBeCalledWith(id);
    expect(doctor).toEqual({ doctor_id: "1" });
  });
});

describe("'doctorService' class", () => {
  it("'getDoctorSpecialization' method", async () => {
    const doctorSpecialization = await doctorService.getDoctorSpecializationByUserId(
      id
    );
    expect(doctorStorage.findSpecialization).toHaveBeenCalledTimes(1);
    expect(doctorStorage.findSpecialization).toBeCalledWith(id);
    expect(doctorSpecialization).toEqual({ specialization: "dentist" });
  });
});
