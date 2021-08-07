class ResolutionsService {
  constructor() {
    this.storage = [
      {
        data: { name: "vincent", resolution: "drag addict" },
        timestamp: 1728346053674,
      },
    ];
  }

  async addResolution(value, ttl = 30000) {
    this.storage = this.storage.filter((item) => item.name !== value.name);
    const patient = {
      data: value,
      timestamp: Date.now() + ttl,
    };
    this.storage.push(patient);

    setTimeout(() => {
      this.storage = this.storage.filter(
        (item) => item.data.name !== value.name
      );
    }, ttl + 10000);
  }

  async getResolution(name) {
    const patient = this.storage.find((item) => item.data.name === name);
    if (!patient) return;
    if (patient.timestamp > Date.now()) return patient;
    return "expired";
  }

  async deleteResolution(name) {
    const resolution = this.storage.find((item) => item.data.name === name);
    if (!resolution) return null;
    this.storage = this.storage.filter((item) => item.data.name !== name);
    return true;
  }

  // create for testing
  async getAllResolutions() {
    return this.storage;
  }

  async destroyStorage() {
    this.storage = [];
  }
}

module.exports = new ResolutionsService();
