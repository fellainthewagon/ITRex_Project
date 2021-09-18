const doctorStorage = require("../../src/components/repositories/doctorStorage");
const { Specialization } = require("../../src/db");

jest.mock("../../src/db");
const db = require("../../src/db");

const id = "1EA321";
const data = { name: "name", id };

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'DoctorStorage' class", () => {
  it("'getDoctorByUserId' method", async () => {
    db.Doctor.findOne.mockResolvedValue(data);

    const doctor = await doctorStorage.getDoctorByUserId(id);
    expect(db.Doctor.findOne).toHaveBeenCalledWith({
      where: { user_id: id },
      attributes: ["name", "id"],
      include: {
        attributes: ["specialization"],
        model: Specialization,
        as: "specialization",
      },
    });
    expect(db.Doctor.findOne).toHaveBeenCalledTimes(1);
    expect(doctor).toEqual(data);
  });
});
