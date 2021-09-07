import config from "../../config/config.js";

class Queue {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/queue`;
  }

  async add(id, name) {
    return fetch(this.url + "/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });
  }

  async getCurrent() {
    const response = await fetch(this.url + "/current", {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  }

  async getNext() {
    const response = await fetch(this.url + "/next", {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  }
}

export default new Queue();
