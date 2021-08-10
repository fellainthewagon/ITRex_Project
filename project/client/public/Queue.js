class Queue {
  constructor() {
    this.url = "http://localhost:3000/api/queue";
  }

  async getCurrent() {
    try {
      const response = await fetch(this.url + "/current");
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async add(value) {
    try {
      await fetch(this.url + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async next() {
    try {
      const response = await fetch(this.url + "/next");
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Queue();
