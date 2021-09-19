const patientStorage = require("../components/repositories/patientStorage");
const userStorage = require("../components/repositories/userStorage");
const { USER_EXIST, PATIENT_EXIST } = require("../constants");
const ConflictError = require("../errors/conflictError");

module.exports = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const patient = await patientStorage.findPatientByName(name);
    if (patient) throw new ConflictError(PATIENT_EXIST);

    const user = await userStorage.findUserByEmail(email);
    if (user) throw new ConflictError(USER_EXIST);

    return next();
  } catch (error) {
    return next(error);
  }
};
