module.exports = class Memory {
  constructor() {
    this.queue = [];
    this.resolutions = [];
  }

  async getFirstFromList() {
    return this.queue[0];
  }

  async getNextFromList() {
    this.queue.shift();
    return this.queue[0];
  }

  async addToList(data) {
    this.queue.push(data);
  }

  async create(patientId, resolution, ttl) {
    this.resolutions.push({
      patientId,
      resolution,
      timestamp: Date.now() + ttl * 1000,
    });
  }

  async findById(patientId) {
    const data = await this.search(patientId.toString());
    if (data.timestamp >= Date.now()) return data;

    this.remove(data.patientId);
    return null;
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
