import dataService from "../../data/DataService.js";

class PersonsService {
  constructor() {
    this.dataService = dataService;
  }

  async getFirst() {
    return this.dataService.getFirst();
  }

  async create(person) {
    await this.dataService.pushToQueue(person);
  }
}

export default new PersonsService();
