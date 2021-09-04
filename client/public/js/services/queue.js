import config from "../../config/config.js";

class Queue {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/queue`;
  }

  async add(id, name, token) {
    await fetch(this.url + "/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      body: JSON.stringify({ id, name }),
    });
  }

  async getCurrent() {
    const response = await fetch(this.url + "/current");
    return response.json();
  }

  async getNext() {
    const response = await fetch(this.url + "/next");
    return response.json();
  }
}

export default new Queue();
