const bcrypt = require("bcryptjs");
const { USER_NO_EXIST, WRONG_PASSWORD } = require("../../constants");
const ProfileDto = require("../../dtos/profileDto");
const ApiError = require("../../errors/apiError");
const CatchError = require("../../errors/catchError");
const userStorage = require("../repositories/userStorage");

class UserService {
  async getUser(id) {
    try {
      const user = await userStorage.findByPk(id);
      if (!user) return null;

      const { patient } = user;
      const profileDto = new ProfileDto(patient, user);
      return { ...profileDto };
    } catch (error) {
      throw new CatchError(error.message);
    }
  }

  async checkCredential(body) {
    try {
      const { email, password } = body;

      const user = await userStorage.findOne(email);

      if (!user) throw ApiError.Unauthorized(USER_NO_EXIST);

      const correct = await bcrypt.compare(password, user.password);
      if (!correct) throw ApiError.Unauthorized(WRONG_PASSWORD);

      return user;
    } catch (error) {
      throw new CatchError(error.message, error.statusCode);
    }
  }
}

module.exports = new UserService();
