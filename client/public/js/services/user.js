import config from "../../config/config.js";

class User {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
  }

  async getUser(id, token) {
    return fetch(this.url + `/user/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "x-access-token": `Bearer ${token}`,
      },
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

  async logout(token) {
    await fetch(this.url + "/auth/logout", {
      method: "POST",
      headers: {
        "x-access-token": `Bearer ${token}`,
      },
    });
  }
}

export default new User();
