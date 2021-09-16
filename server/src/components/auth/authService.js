const bcrypt = require("bcryptjs");
const userService = require("../user/userService");
const tokenService = require("../token/tokenService");
const userStorage = require("../repositories/userStorage");
const patientStorage = require("../repositories/patientStorage");
const UserDto = require("../../dtos/userDto");
const CatchError = require("../../errors/catchError");
const doctorStorage = require("../repositories/doctorStorage");
const { DOCTOR_NO_EXIST } = require("../../constants");
const { bcryptSalt } = require("../../../config");
const UnauthorizedError = require("../../errors/unauthorizedError");

class AuthService {
  async registration(body) {
    try {
      const { email, password } = body;

      const hashedPassword = await bcrypt.hash(password, bcryptSalt);
      const user = await userStorage.create(email, hashedPassword);

      await patientStorage.findOrCreate(body, user.id);
      const userDto = new UserDto(user);

      return { ...userDto };
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async login(body) {
    try {
      const user = await userService.checkCredential(body);
      const userDto = new UserDto(user);

      if (user.role === "doctor") {
        const doctor = await doctorStorage.getDoctorByUserId(user.id);
        if (!doctor) throw new UnauthorizedError(DOCTOR_NO_EXIST);

        userDto.doctor_id = doctor.id;
        userDto.doctor_name = doctor.name;
        userDto.doctor_specialization = doctor.specialization.specialization;
      }

      const token = tokenService.generateToken({ ...userDto });

      return { user: { ...userDto }, token };
    } catch (error) {
      throw new CatchError(error.message, error.statusCode);
    }
  }
}

module.exports = new AuthService();
