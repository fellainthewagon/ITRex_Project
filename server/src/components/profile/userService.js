const bcrypt = require("bcryptjs");
const { WRONG_CREDENTIALS, USER_NOT_FOUND } = require("../../constants");
const ProfileDto = require("../../dtos/profileDto");
const CatchError = require("../../errors/catchError");
const userStorage = require("../repositories/userStorage");
const UnauthorizedError = require("../../errors/unauthorizedError");
const NotFoundError = require("../../errors/notFoundError");

class UserService {
  async getUser(id) {
    try {
      const data = await userStorage.findUserById(id);
      if (!data) throw new NotFoundError(USER_NOT_FOUND);

      const profileDto = new ProfileDto(data);

      return { ...profileDto };
    } catch (error) {
      throw new CatchError(error);
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
      throw new CatchError(error);
    }
  }
}

module.exports = new UserService();
