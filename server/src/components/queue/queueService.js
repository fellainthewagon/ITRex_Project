class QueueService {
  constructor() {
    this.queue = [
      /* { key: "name1" }, { key: "name2" } */
    ];
  }

  async getCurrent() {
    return this.queue[0];
  }

  async getNext() {
    this.queue.shift();
    return this.queue[0];
  }

  async add(value) {
    if (this.queue.find((item) => item.key === value.key)) {
      this.queue = this.queue.filter((item) => item.key !== value.key);
      this.queue.push(value);
      return;
    }
    this.queue.push(value);
  }

  // create for testing
  async getAllpersons() {
    return this.queue;
  }

  async destroyQueue() {
    this.queue = [];
  }
}

module.exports = new QueueService();
