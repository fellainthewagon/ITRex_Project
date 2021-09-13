import config from "../../config/config.js";

class Queue {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/queue`;
  }

  async add(id, name, specialization) {
    return fetch(this.url + "/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, specialization }),
    });
  }

  async getCurrent(doctorId) {
    const response = await fetch(this.url + `/current/${doctorId}`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  }

  async getNext(doctorId) {
    const response = await fetch(this.url + `/next/${doctorId}`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  }
}

export default new Queue();
