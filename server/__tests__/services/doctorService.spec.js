const doctorService = require("../../src/components/doctor/doctorService");
const doctorStorage = require("../../src/components/repositories/doctorStorage");

doctorStorage.findById = jest.fn();
const id = 2;

describe("'doctorStorage' class", () => {
  it("'findById' method", async () => {
    doctorService.getDoctorId(id);
    expect(doctorStorage.findById).toHaveBeenCalledTimes(1);
    expect(doctorStorage.findById).toBeCalledWith(id);
  });
});
