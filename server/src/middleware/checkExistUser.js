const { CONFLICT } = require("http-status-codes");
const { USER_EXIST } = require("../constants/statusMessage");
const { User } = require("../db");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const isExist = await User.findOne({ where: { email } });

  if (isExist) return res.status(CONFLICT).json({ message: USER_EXIST });

  return next();
};
