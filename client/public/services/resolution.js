import config from "../config/config.js";

class Resolution {
  constructor({ protocol, host, port } = config) {
    this.url = `${protocol}://${host}:${port}/api/patients/`;
  }

  async add(id, value) {
    await fetch(this.url + id + "/resolution", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
  }

  async find(value) {
    const params = new URLSearchParams({
      name: value,
    });

    const response = await fetch(this.url + "resolution?" + params);
    return response.json();
  }

  async delete(id) {
    return fetch(this.url + id + "/resolution", {
      method: "DELETE",
    });
  }
}

export default new Resolution();
