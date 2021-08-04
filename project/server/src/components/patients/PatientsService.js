const dataService = require("../../data/DataService");

class PatientsService {
  constructor() {
    this.dataService = dataService;
  }

  async getNextPatient() {
    return this.dataService.getNext();
  }

  async addPatient(value) {
    await this.dataService.saveToStorage(value);
  }

  async getPatient(name) {
    return this.dataService.findByName(name);
  }

  async deletePatient(name) {
    await this.dataService.findByNameAndDelete(name);
  }
}

module.exports = new PatientsService();
