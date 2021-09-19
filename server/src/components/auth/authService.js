const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../user/userService");
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
<<<<<<< HEAD
=======

>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
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
<<<<<<< HEAD
      if (user.role === "doctor") {
        const doctor = await doctorService.getDoctorId(user.id);
        userDto.doctor_id = doctor.id;
      }
=======

>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
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
