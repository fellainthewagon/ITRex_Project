const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../user/userService");
const doctorService = require("../doctor/doctorService");
const tokenService = require("../token/tokenService");
const userStorage = require("../repositories/userStorage");
const patientStorage = require("../repositories/patientStorage");
const UserDto = require("../../dtos/userDto");
const CatchError = require("../../errors/catchError");

class AuthService {
  async registration(body) {
    try {
      const { email, password } = body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userStorage.create(email, hashedPassword);
      await patientStorage.findOrCreate(body, user.user_id);
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
        const doctor = await doctorService.getDoctorId(user.user_id);
        userDto.doctor_id = doctor.doctor_id;
      }
      const tokens = tokenService.generateTokens({ ...userDto });

      return { user: { ...userDto }, ...tokens };
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async logout() {
    return jwt.sign({}, "fake secret", {
      expiresIn: "1s",
    });
  }
}

module.exports = new AuthService();
