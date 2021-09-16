const bcrypt = require("bcryptjs");
const { WRONG_CREDENTIALS } = require("../../constants");
const ProfileDto = require("../../dtos/profileDto");
const CatchError = require("../../errors/catchError");
const userStorage = require("../repositories/userStorage");
const UnauthorizedError = require("../../errors/unauthorizedError");

class UserService {
  async getUser(id) {
    try {
      const data = await userStorage.findUserById(id);
      if (!data) return null;

      const profileDto = new ProfileDto(data);

      return { ...profileDto };
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async checkCredential(body) {
    try {
      const { email, password } = body;

      const user = await userStorage.findUserByEmail(email);
      if (!user) throw new UnauthorizedError(WRONG_CREDENTIALS);

      const correct = await bcrypt.compare(password, user.password);
      if (!correct) throw new UnauthorizedError(WRONG_CREDENTIALS);

      return user;
    } catch (error) {
      throw new CatchError(error.message, error.statusCode);
    }
  }
}

module.exports = new UserService();
