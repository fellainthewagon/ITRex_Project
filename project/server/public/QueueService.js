class QueueService {
  constructor() {
    this.url = "http://localhost:3000/api/";
  }

  async getFirst() {
    try {
      const response = await fetch(this.url + "queue/first");
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async add(value) {
    try {
      await fetch(this.url + "queue/", {
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
      const response = await fetch(this.url + "queue/next");
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

const queue = new QueueService();
export default queue;
