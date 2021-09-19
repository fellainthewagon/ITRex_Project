const doctorStorage = require("../../src/components/repositories/doctorStorage");
const db = require("../../src/db");

const id = 2;
const object = { doctor_id: "1" };
db.Doctor.findOne = jest.fn(() => object);

describe("'doctorStorage' class", () => {
  it("'findById' method", async () => {
    const doctor = await doctorStorage.findById(id);
    expect(db.Doctor.findOne).toHaveBeenCalledTimes(1);
    expect(db.Doctor.findOne).toBeCalledWith({ where: { user_id: id } });
    expect(doctor).toEqual({ doctor_id: "1" });
  });
});

describe("'doctorStorage' class", () => {
  it("'findSpecialization' method", async () => {
    db.Doctor.findOne = jest.fn(() => object);
    const doctor = await doctorStorage.findSpecialization(id);
    expect(db.Doctor.findOne).toHaveBeenCalledTimes(1);
    expect(db.Doctor.findOne).toBeCalledWith({
      attributes: ["name"],
      where: { user_id: id },
      include: {
        attributes: ["specialization"],
        model: db.Specialization,
        as: "specialization",
      },
    });
    expect(doctor).toEqual({ doctor_id: "1" });
  });
});
