import config from "../../config/config.js";

class Doctor {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
  }

  async getDoctor(id) {
    return fetch(this.url + `/doctor/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
}

export default new Doctor();
