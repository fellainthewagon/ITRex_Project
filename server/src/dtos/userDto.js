module.exports = class UserDto {
  constructor(user) {
    this.id = user.user_id;
    this.email = user.email;
    this.role = user.role;
  }
};
