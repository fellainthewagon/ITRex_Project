const { CONFLICT } = require("http-status-codes");
const userStorage = require("../components/storage/userStorage");
const { USER_EXIST } = require("../constants/statusMessage");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const isExist = await userStorage.findByEmail(email);

  if (isExist) return res.status(CONFLICT).json({ message: USER_EXIST });

  return next();
};
