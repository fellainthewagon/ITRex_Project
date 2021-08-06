class StorageService {
  constructor() {
    this.url = "http://localhost:3000/api/";
  }

  async addResolution(value) {
    try {
      const response = await fetch(this.url + "resolutions/", {
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
      const response = await fetch(this.url + "resolutions/" + name);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteResolution(name) {
    try {
      const response = await fetch(this.url + "resolutions/" + name, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new StorageService();
