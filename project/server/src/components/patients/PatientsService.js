class PatientsService {
  constructor() {
    this.storage = [];
  }

  async addPatient(value) {
    this.storage = this.storage.filter((item) => item.name !== value.name);
    this.storage.push(value);
  }

  async getPatient(name) {
    return this.storage.find((item) => item.name === name);
  }

  async deletePatient(name) {
    this.storage = this.storage.filter((item) => item.name !== name);
  }

  // create for testing
  async getAllpatients() {
    return this.storage;
  }

  async destroyStorage() {
    this.storage = [];
  }
}

module.exports = new PatientsService();
