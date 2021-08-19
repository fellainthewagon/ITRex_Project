module.exports = class Memory {
  constructor() {
    this.queue = [];
    this.resolutions = [];
  }

  async getFirstFromList() {
    return this.queue[0];
  }

  async popFromList() {
    this.queue.shift();
  }

  async addToList(data) {
    if (this.queue.some((item) => item === data)) {
      this.queue = this.queue.filter((item) => item !== data);
    }
    this.queue.push(data);
  }

  async create(key, resolution, ttl) {
    const patientResolution = {
      data: { key, resolution },
      timestamp: Date.now() + ttl,
    };
    this.resolutions.push(patientResolution);

    setTimeout(() => this.remove(key), ttl * 1000);
  }

  async findByName(name) {
    const patient = this.search(name);

    return patient ? patient.data.resolution : null;
  }

  async deleteByName(name) {
    const patient = this.search(name);

    return patient ? this.remove(name) : null;
  }

  search(name) {
    return this.resolutions.length
      ? this.resolutions.find((item) => item.data.key === name)
      : null;
  }

  remove(name) {
    this.resolutions = this.resolutions.filter(
      (item) => item.data.key !== name
    );

    return true;
  }
};
