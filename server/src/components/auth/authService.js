const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../user/userService");
const CatchError = require("../../errors/catchError");
const UserDto = require("../../dtos/userDto");
const { Patient, User } = require("../../db");
const tokenService = require("../token/tokenService");

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
