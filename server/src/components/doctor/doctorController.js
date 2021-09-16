const doctorService = require("./doctorService");

class DoctorController {
  async getDoctor(req, res, next) {
    try {
      const data = await doctorService.getDoctorData(req.user.id);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new DoctorController();
