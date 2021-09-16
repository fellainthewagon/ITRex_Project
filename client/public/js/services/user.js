import config from "../../config/config.js";
import { jumpToStartPage } from "../utils/index.js";

class User {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
    this.jwt = localStorage.getItem("jwt");
  }

  async getUser() {
    if (!this.jwt) return jumpToStartPage();

    const response = await fetch(this.url + "/user", {
      method: "GET",
      headers: {
        "x-access-token": `Bearer ${this.jwt}`,
      },
    });

    return response.status === 401 ? jumpToStartPage() : response.json();
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

  async logout(jwt) {
    await fetch(this.url + "/auth/logout", {
      method: "POST",
      headers: {
        "x-access-token": `Bearer ${jwt}`,
      },
    });
  }
}

export default new User();
