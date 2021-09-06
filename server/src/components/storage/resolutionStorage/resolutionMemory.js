module.exports = class ResolutionMemory {
  constructor() {
    this.resolutions = [];
  }

  async create(patientId, resolution, ttl) {
    this.resolutions.push({
      patient_id: patientId,
      resolution,
      expire_timestamp: Date.now() + ttl * 1000,
    });
  }

  async findById(patientId) {
    const data = await this.search(patientId.toString());
    if (data.expire_timestamp >= Date.now()) return data;

    this.remove(data.patient_id);
    return null;
  }

  async deleteById(patientId) {
    const resolution = await this.search(patientId);

    return resolution ? this.remove(patientId) : null;
  }

  async search(patientId) {
    return this.resolutions.length
      ? this.resolutions.find((item) => item.patient_id === patientId)
      : null;
  }

  async remove(patientId) {
    this.resolutions = this.resolutions.filter(
      (item) => item.patient_id !== patientId
    );

    return true;
  }
};
