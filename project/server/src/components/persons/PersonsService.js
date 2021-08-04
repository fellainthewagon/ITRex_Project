const dataService = require("../../data/DataService");

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

module.exports = new PersonsService();
