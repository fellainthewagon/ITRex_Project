module.exports = class PatientDto {
  constructor(patient) {
    this.id = patient.id;
    this.name = patient.name;
  }
};
