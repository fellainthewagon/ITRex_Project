const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../../config");

const userStorage = require("../storage/userStorage");
const patientStorage = require("../storage/patientStorage");

class AuthService {
  constructor(userRepo, patientRepo) {
    this.userStorage = userRepo;
    this.patientStorage = patientRepo;
  }

  async getUser(req) {
    const { userId } = req.user;

    const user = await this.userStorage.findById(userId);
    if (!user) return null;

    const { patient } = user;

    return { id: patient.id, name: patient.name, email: user.email };
  }

  async registration(body) {
    try {
      const { name, email, password } = body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userStorage.create(email, hashedPassword);

      const patient = await this.patientStorage.create(name, user.id);

      return { id: patient.id, name: patient.name };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(userId) {
    try {
      return jwt.sign({ userId }, secret, { expiresIn });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new AuthService(userStorage, patientStorage);
