module.exports = class Memory {
  constructor() {
    this.queue = [];
    this.resolutions = [];
  }

  getFirstFromList() {
    return this.queue[0];
  }

  popFromList() {
    this.queue.shift();
  }

  addToList(data) {
    if (this.queue.some((item) => item === data)) {
      this.queue = this.queue.filter((item) => item !== data);
    }
    this.queue.push(data);
  }

  create(key, resolution, ttl) {
    const patientResolution = {
      data: { key, resolution },
      // timestamp: Date.now() + ttl,
    };
    this.resolutions.push(patientResolution);

    setTimeout(() => this.remove(key), ttl * 1000);
  }

  findByName(name) {
    const patient = this.search(name);

    return patient ? patient.data.resolution : null;
  }

  deleteByName(name) {
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
