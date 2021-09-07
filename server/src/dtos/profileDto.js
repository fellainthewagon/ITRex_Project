module.exports = class ProfileDto {
  constructor(patient, user) {
    this.id = patient.id;
    this.name = patient.name;
    this.dob = patient.dob;
    this.gender = patient.gender;
    this.email = user.email;
  }
};
