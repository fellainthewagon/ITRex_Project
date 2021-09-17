const userStorage = require("../components/repositories/userStorage");
const { USER_EXIST } = require("../constants");
const ConflictError = require("../errors/conflictError");

module.exports = async (req, res, next) => {
  const { email } = req.body;

  try {
    const isExist = await userStorage.findUserByEmail(email);
    if (isExist) throw new ConflictError(USER_EXIST);

    return next();
  } catch (error) {
    return next(error);
  }
};
