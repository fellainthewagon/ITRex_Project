import dataService from "../../data/DataService.js";

class PersonsService {
  constructor() {
    this.dataService = dataService;
  }

  async create(person) {
    await this.dataService.pushToQueue(person);
  }

  async getOne(name) {
    return this.dataService.findByName(name);
  }
}

export default new PersonsService();
