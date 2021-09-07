const { CONFLICT } = require("http-status-codes");
const userStorage = require("../components/repositories/userStorage");
const { USER_EXIST } = require("../constants");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const isExist = await userStorage.findOne(email);

  if (isExist) return res.status(CONFLICT).json({ message: USER_EXIST });

  return next();
};
