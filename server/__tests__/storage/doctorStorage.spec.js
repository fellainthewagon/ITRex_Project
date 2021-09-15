const doctorStorage = require("../../src/components/repositories/doctorStorage");

jest.mock("../../src/db");
const db = require("../../src/db");
const id = "1EA321";
const data = { name: "name", id };
beforeEach(() => jest.clearAllMocks());
/**
 * TEST
 */
describe("'DoctorStorage' class", () => {
  it("'findById' method", async () => {
    db.Doctor.findOne.mockResolvedValue(data);
    const doctor = await doctorStorage.findById(id);
    expect(db.Doctor.findOne).toHaveBeenCalledWith({ where: { user_id: id } });
    expect(db.Doctor.findOne).toHaveBeenCalledTimes(1);
    expect(doctor).toEqual(data);
  });
});

describe("'DoctorStorage' class", () => {
  it("'findSpecialization' method", async () => {    
    db.Doctor.findOne.mockResolvedValue(data);
    const doctor = await doctorStorage.findSpecialization(id);
    expect(db.Doctor.findOne).toHaveBeenCalledWith({
      attributes: ["name"],
      where: { user_id: id },
      include: {
        attributes: ["specialization"],
        model: db.Specialization,
        as: "specialization",
      },
    });
    expect(db.Doctor.findOne).toHaveBeenCalledTimes(1);
    expect(doctor).toEqual(data);
  });
});
