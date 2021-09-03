module.exports = class ResolutionDto {
  constructor(resolution) {
    // this.id = resolution.id;
    this.patient_id = resolution.patient_id;
    this.resolution = resolution.resolution;
  }
};
