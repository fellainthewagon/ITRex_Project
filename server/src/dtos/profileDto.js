module.exports = class ProfileDto {
  constructor(patient, user) {
    this.id = patient.id;
    this.name = patient.name;
    this.email = user.email;
  }
};
