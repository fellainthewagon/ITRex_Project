class QueueService {
  constructor() {
    this.url = "http://localhost:3000/";
  }

  async getFirst() {
    const response = await fetch(this.url + "queue/first");
    return response.json();
  }

  async add(value) {
    await fetch(this.url + "queue/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
  }

  async next() {
    const response = await fetch(this.url + "patients/next");
    return await response.json();
  }
}

const queue = new QueueService();
export default queue;
