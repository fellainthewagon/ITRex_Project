import dataService from "../../data/DataService.js";

class PatientsService {
  constructor() {
    this.dataService = dataService;
  }

  async getNextPatient() {
    return this.dataService.shiftFromQueue();
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

export default new PatientsService();
