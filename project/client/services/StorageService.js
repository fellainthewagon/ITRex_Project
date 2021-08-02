class StorageService {
  constructor() {
    this.url = "http://localhost:3000/";
  }

  async addResolution(value) {
    const response = await fetch(this.url + "patients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    return response.json();
  }

  async findResolution(name) {
    const response = await fetch(this.url + "patients/" + name);
    return response.json();
  }

  async deleteResolution(name) {
    const response = await fetch(this.url + "patients/" + name, {
      method: "DELETE",
    });

    return response.json();
  }
}

export default new StorageService();
