import config from "../config/config.js";

class User {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/auth`;
  }

  async getUser(token) {
    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "x-access-token": `Bearer ${token}`,
      },
    });

    return response.json();
  }

  async sendData(data, method) {
    return fetch(this.url + "/" + method, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

export default new User();
