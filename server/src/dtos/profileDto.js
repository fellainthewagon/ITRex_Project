module.exports = class ProfileDto {
  constructor(data) {
    this.id = data["patient.id"];
    this.name = data["patient.name"];
    this.dob = data["patient.dob"];
    this.gender = data["patient.gender"];
    this.email = data.email;
  }
};
