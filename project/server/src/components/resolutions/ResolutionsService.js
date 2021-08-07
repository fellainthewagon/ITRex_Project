class ResolutionsService {
  constructor() {
    this.storage = [{ name: "vincent", resolution: "drag addict" }];
  }

  async addResolution(value) {
    this.storage = this.storage.filter((item) => item.name !== value.name);
    this.storage.push(value);
  }

  async getResolution(name) {
    return this.storage.find((item) => item.name === name);
  }

  async deleteResolution(name) {
    const resolution = this.storage.find((item) => item.name === name);
    if (!resolution) return null;
    this.storage = this.storage.filter((item) => item.name !== name);
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
