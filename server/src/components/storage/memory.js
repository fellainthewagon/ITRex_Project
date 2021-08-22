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

  async create(patientId, data, ttl) {
    this.resolutions.push({ patientId, data });

    setTimeout(async () => await this.remove(patientId), ttl * 1000);
  }

  async findById(patientId) {
    const resolution = await this.search(patientId.toString());

    return resolution?.data || null;
  }

  async deleteById(patientId) {
    const resolution = await this.search(patientId);

    return resolution ? await this.remove(patientId) : null;
  }

  async search(patientId) {
    return this.resolutions.length
      ? this.resolutions.find((item) => item.patientId === patientId)
      : null;
  }

  async remove(patientId) {
    this.resolutions = this.resolutions.filter(
      (item) => item.patientId !== patientId
    );

    return true;
  }
};
