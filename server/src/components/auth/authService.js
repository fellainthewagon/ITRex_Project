const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../user/userService");
const CatchError = require("../../errors/catchError");
const UserDto = require("../../dtos/userDto");
const { secret, expiresIn } = require("../../../config");
const { Patient, User } = require("../../db");

class AuthService {
  async registration(body) {
    try {
      const { name, email, password } = body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });

      await Patient.create({ name, user_id: user.id });
      const userDto = new UserDto(user);

      return { ...userDto };
    } catch (error) {
      throw new CatchError(error.statusCode, error.message);
    }
  }

  async login(body) {
    try {
      const user = await userService.checkCredential(body);
      const userDto = new UserDto(user);

      return {
        user: { ...userDto },
        token: jwt.sign({ ...userDto }, secret, { expiresIn }),
      };
    } catch (error) {
      throw new CatchError(error.statusCode, error.message);
    }
  }

  async logout() {
    return jwt.sign({}, secret, {
      expiresIn: "1s",
    });
  }
}

module.exports = new AuthService();
