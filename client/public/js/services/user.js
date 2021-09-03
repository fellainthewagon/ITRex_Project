import config from "../../config/config.js";

class User {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
  }

  async getUser(token) {
    return fetch(this.url + "/user", {
      method: "GET",
      headers: {
        "x-access-token": `Bearer ${token}`,
      },
    });
  }

  async sendData(data, method) {
    return fetch(this.url + "/auth/" + method, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async logout(token) {
    const response = await fetch(this.url + "/auth/logout", {
      method: "POST",
      headers: {
        "x-access-token": `Bearer ${token}`,
      },
    });

    return response.json();
  }
}

export default new User();
