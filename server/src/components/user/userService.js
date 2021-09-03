const bcrypt = require("bcryptjs");
const {
  USER_NO_EXIST,
  WRONG_PASSWORD,
} = require("../../constants/statusMessage");
const { User } = require("../../db");
const ProfileDto = require("../../dtos/profileDto");
const ApiError = require("../../errors/apiError");
const CatchError = require("../../errors/catchError");

class UserService {
  async getUser(id) {
    try {
      const user = (await User.findByPk(id, { include: "patient" }))?.get({
        plain: true,
      });
      if (!user) return null;

      const { patient } = user;
      const profileDto = new ProfileDto(patient, user);

      return { ...profileDto };
    } catch (error) {
      throw new CatchError(error.statusCode, error.message);
    }
  }

  async checkCredentialAndGetUser(body) {
    try {
      const { email, password } = body;

      const user = await User.findOne({ where: { email }, raw: true });
      if (!user) throw ApiError.Unauthorized(USER_NO_EXIST);

      const correct = await bcrypt.compare(password, user.password);
      if (!correct) throw ApiError.Unauthorized(WRONG_PASSWORD);

      return user;
    } catch (error) {
      throw new CatchError(error.statusCode, error.message);
    }
  }
}

module.exports = new UserService();
