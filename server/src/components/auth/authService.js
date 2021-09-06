const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../user/userService");
const tokenService = require("../token/tokenService");
const userStorage = require("../storage/userStorage");
const patientStorage = require("../storage/patientStorage");
const UserDto = require("../../dtos/userDto");
const CatchError = require("../../errors/catchError");

class AuthService {
  async registration(body) {
    try {
      const { name, email, password } = body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userStorage.create(email, hashedPassword);

      await patientStorage.findOrCreate(name, user);
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
