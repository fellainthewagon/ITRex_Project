import config from "../../config/config.js";
import { jumpToStartPage } from "../utils/index.js";

class User {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
    this.jwt = localStorage.getItem("jwt");
  }

  async getProfile() {
    if (!this.jwt) return null;

    const response = await fetch(this.url + "/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
    const data = await response.json();

    if (response.status === 401) return jumpToStartPage();
    if (response.status >= 400) throw new Error(data.message);

    return data;
  }

  async getDoctor() {
    const jwt = localStorage.getItem("doctor-jwt");
    if (!jwt) return null;

    const response = await fetch(this.url + `/doctor`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();

    if (response.status === 401) return jumpToStartPage();
    if (response.status >= 400) throw new Error(data.message);

    return data;
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
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}

export default new User();
