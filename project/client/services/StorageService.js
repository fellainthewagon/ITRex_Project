class StorageService {
  constructor() {
    this.url = "http://localhost:3000/";
  }

  async addResolution(value) {
    try {
      const response = await fetch(this.url + "patients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async findResolution(name) {
    try {
      const response = await fetch(this.url + "patients/" + name);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteResolution(name) {
    try {
      const response = await fetch(this.url + "patients/" + name, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new StorageService();
