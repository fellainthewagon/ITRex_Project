class QueueService {
  constructor() {
    this.queue = [{ name: "name1" }, { name: "name2" }];
  }

  async getFirst() {
    return this.queue[0];
  }

  async getNext() {
    this.queue.shift();
    return this.queue[0];
  }

  async add(value) {
    if (this.queue.find((item) => item.name === value.name)) {
      this.queue = this.queue.filter((item) => item.name !== value.name);
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
