import config from "../../config/config.js";

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
        "x-access-token": `Bearer ${jwt}`,
      },
      body: JSON.stringify({ id, name, specialization }),
    });

    if (response.status === 401) return jumpToStartPage();

    if (response.status === 201) {
      addedMessage.innerText = "You have been added to the queue!";
      addedMessage.style.display = "block";

      setTimeout(() => {
        addedMessage.style.display = "none";
      }, 4000);
    }
  }

  async getCurrent() {
    const jwt = localStorage.getItem("doctor-jwt");
    if (!jwt) {
      jumpToStartPage();
    }

    const response = await fetch(this.url + `/current`, {
      method: "GET",
      headers: {
        "x-access-token": `Bearer ${this.jwt}`,
      },
    });

    return response.status === 401 ? jumpToStartPage() : response.json();
  }

  async getNext() {
    const jwt = localStorage.getItem("doctor-jwt");
    if (!jwt) {
      jumpToStartPage();
    }

    const response = await fetch(this.url + `/next`, {
      method: "GET",
      headers: {
        "x-access-token": `Bearer ${this.jwt}`,
      },
    });
    return response.status === 401 ? jumpToStartPage() : response.json();
  }
}

export default new Queue();
