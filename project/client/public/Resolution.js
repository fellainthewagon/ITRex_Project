class Resolution {
  constructor() {
    this.url = "http://localhost:3000/api/patients/";
  }

  async add(key, value) {
    try {
      const response = await fetch(this.url + key + "/resolution", {
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

  async find(key) {
    try {
      const response = await fetch(this.url + key + "/resolution");
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async delete(key) {
    try {
      const response = await fetch(this.url + key + "/resolution", {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Resolution();
