import config from "../../config/config.js";
import { jumpToStartPage } from "../utils/index.js";

const addedResolutionMessage = document.querySelector(
  ".added-resolution-message"
);

class Resolution {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/`;
    this.jwt = localStorage.getItem("doctor-jwt");
  }

  async add(id, value) {
    if (!this.jwt) return jumpToStartPage();

    const response = await fetch(this.url + id + "/resolution", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.jwt}`,
      },
      body: JSON.stringify(value),
    });

    if (response.status === 401) return jumpToStartPage();

    if (response.status === 204) {
      addedResolutionMessage.innerText = "Resolution added!";
      addedResolutionMessage.style.display = "block";

      setTimeout(() => {
        addedResolutionMessage.style.display = "none";
      }, 4000);
    }
  }

  async find(value, jwt) {
    const params = new URLSearchParams({
      name: value,
    });

    const response = await fetch(`${this.url}resolution?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.json();
  }

  async delete(patientId, resolutionId) {
    if (!this.jwt) return jumpToStartPage();

    return fetch(`${this.url}${patientId}/resolution/${resolutionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
  }
}

export default new Resolution();
