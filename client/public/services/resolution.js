import config from "../config/config.js";

class Resolution {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/;`;
  }

  async add(key, value) {
    await fetch(this.url + key + "/resolution", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
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
