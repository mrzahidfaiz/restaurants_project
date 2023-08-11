class UserDTO {
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}

module.exports = UserDTO;
