const { UNAUTHORIZED } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const userStorage = require("../components/storage/userStorage");
const { USER_NO_EXIST, WRONG_PASSWORD } = require("../constants/statusMessage");
const AuthException = require("../errors/authException");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userStorage.findByEmail(email);
  // if (!user) throw new AuthException(USER_NO_EXIST);
  if (!user) return res.status(UNAUTHORIZED).json({ message: USER_NO_EXIST });

  const correct = bcrypt.compareSync(password, user.password);
  // if (!correct) throw new AuthException(WRONG_PASSWORD);
  if (!correct)
    return res.status(UNAUTHORIZED).json({ message: WRONG_PASSWORD });

  req.body.userId = user.id;

  next();
};
