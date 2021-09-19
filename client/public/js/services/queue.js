import config from "../../config/config.js";
import { jumpToStartPage } from "../utils/index.js";

const addedMessage = document.querySelector(".added-message");

class Queue {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/queue`;
    this.jwt = localStorage.getItem("doctor-jwt");
  }

  async add(id, name, specialization) {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch(this.url + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ id, name, specialization }),
    });

    if (response.status === 401) return jumpToStartPage();
    if (response.status >= 400) {
      const data = await response.json();
      throw new Error(data.message);
    }

    if (response.status === 201) {
      addedMessage.innerText = "You have been added to the queue!";
      addedMessage.style.display = "block";

      setTimeout(() => {
        addedMessage.style.display = "none";
      }, 4000);
    }
  }

  async getCurrent() {
    if (!this.jwt) return jumpToStartPage();

    const response = await fetch(this.url + `/current`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
    const data = await response.json();

    if (response.status === 401) return jumpToStartPage();
    if (response.status === 404) return null;
    if (response.status >= 400) throw new Error(data.message);

    return data;
  }

  async getNext() {
    if (!this.jwt) return jumpToStartPage();

    const response = await fetch(this.url + `/next`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
    const data = await response.json();

    if (response.status === 401) return jumpToStartPage();
    if (response.status === 404) return null;
    if (response.status >= 400) throw new Error(data.message);

    return data;
  }
}

export default new Queue();
