import config from "../../config/config.js";
import { jumpToStartPage } from "../utils/index.js";

class Doctor {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api`;
  }

  async getDoctor() {
    const jwt = localStorage.getItem("doctor-jwt");
    if (!jwt) {
      return jumpToStartPage();
    }

    const response = await fetch(this.url + `/doctor`, {
      method: "GET",
      headers: {
        "x-access-token": `Bearer ${jwt}`,
      },
    });

    return response.status === 401 ? jumpToStartPage() : response.json();
  }
}

export default new Doctor();
