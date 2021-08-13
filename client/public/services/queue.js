import config from "../config/config.js";

class Queue {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/queue`;
  }

  async getCurrent() {
    const response = await fetch(this.url + "/current");
    return response.json();
  }

  async add(value) {
    await fetch(this.url + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
  }

  async next() {
    const response = await fetch(this.url + "/next");
    return await response.json();
  }
}

export default new Queue();
