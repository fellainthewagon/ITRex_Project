module.exports = class ResolutionMemoryStorage {
  constructor() {
    this.storage = [];
    global.console.log("Connected to Memory! | Database: 'resolution'");
  }

  async create(value, ttl) {
    this.storage = this.storage.filter((item) => item.data.key !== value.key);
    const patientResolution = {
      data: value,
      timestamp: Date.now() + ttl,
    };
    this.storage.push(patientResolution);

    setTimeout(() => {
      this.storage = this.storage.filter((item) => item.data.key !== value.key);
    }, ttl * 1000);
  }

  async findByKey(key) {
    const patient = this.storage.find((item) => item.data.key === key);
    return patient?.data || null;
  }

  async deleteByKey(key) {
    const resolution = this.storage.find((item) => item.data.key === key);
    if (!resolution) return null;
    this.storage = this.storage.filter((item) => item.data.key !== key);
    return true;
  }
};
