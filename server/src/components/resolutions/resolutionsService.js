class ResolutionsService {
  constructor() {
    this.storage = [
      /*       {
        data: { key: "vincent", resolution: "drag addict" },
        timestamp: 1728346053674,
      }, */
    ];
  }

  async addResolution(value) {
    const { key, resolution, ttl } = value;
    this.storage = this.storage.filter((item) => item.data.key !== key);
    const patientResolution = {
      data: { key, resolution },
      timestamp: Date.now() + ttl,
    };
    this.storage.push(patientResolution);

    setTimeout(() => {
      this.storage = this.storage.filter((item) => item.data.key !== key);
    }, ttl);
  }

  async getResolution(key) {
    const patient = this.storage.find((item) => item.data.key === key);
    return !patient ? null : patient;
  }

  async deleteResolution(key) {
    const resolution = this.storage.find((item) => item.data.key === key);
    if (!resolution) return null;
    this.storage = this.storage.filter((item) => item.data.key !== key);
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
