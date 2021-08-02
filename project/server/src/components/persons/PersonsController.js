import personsService from "./PersonsService.js";

class PersonsController {
  async addPerson(req, res, next) {
    try {
      await personsService.create(req.body);
      return res.json({ message: "person added to queue" });
    } catch (error) {
      return next(error);
    }
  }

  async getPatient(req, res, next) {
    try {
      const person = await personsService.getOne(req.params.name);
      return res.json(person);
    } catch (error) {
      return next(error);
    }
  }
}

export default new PersonsController();
