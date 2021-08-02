import personsService from "./PersonsService.js";

class PersonsController {
  async firstPerson(req, res, next) {
    try {
      const person = await personsService.getFirst();
      if (person) {
        return res.json(person);
      }
      return res.json({ message: "The Queue is empty" });
    } catch (error) {
      return next(error);
    }
  }

  async addPerson(req, res, next) {
    try {
      await personsService.create(req.body);
      return res.json({ message: "Person added to queue" });
    } catch (error) {
      return next(error);
    }
  }
}

export default new PersonsController();
