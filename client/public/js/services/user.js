import config from "../../config/config.js";

class User {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
  }

  async getUser(id) {
    return fetch(this.url + `/user/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }

  async sendData(data, method) {
    return fetch(this.url + "/auth/" + method, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async logout() {
    await fetch(this.url + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  }
}

export default new User();
