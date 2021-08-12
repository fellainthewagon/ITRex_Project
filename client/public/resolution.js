import config from "./config/config.js";

const { protocol, host, port } = config;

class Resolution {
  constructor() {
    this.url = `${protocol}://${host}:${port}/api/patients/;`;
  }

  async add(key, value) {
    const response = await fetch(this.url + key + "/resolution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    return response.json();
  }

  async find(key) {
    const response = await fetch(this.url + key + "/resolution");
    return response.json();
  }

  async delete(key) {
    const response = await fetch(this.url + key + "/resolution", {
      method: "DELETE",
    });
    return response.json();
  }
}

export default new Resolution();
