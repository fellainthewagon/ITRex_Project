const doctorService = require("./doctorService");

class doctorController {
  async getDoctor(req, res, next) {
    try {
      const data = await doctorService.getDoctorSpecializationByUserId(req.params.id);
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new doctorController();
