module.exports = class ResolutionDto {
  constructor(patient, resolution) {
    this.patientId = patient.id;
    this.name = patient.name;
    this.gender = patient.gender;
    this.dob = patient.dob;
    this.resolutionId = resolution.id;
    this.resolution = resolution.resolution;
    this.createdData = resolution.createdAt;
    this.doctorName = resolution["doctor.name"];
    this.doctorSpecialization =
      resolution["doctor.specialization.specialization"];
  }
};
