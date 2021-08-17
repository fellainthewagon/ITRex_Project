module.exports = class QueueMemoryStorage {
  constructor() {
    this.queue = [];
    global.console.log("Connected to Memory! | Database: 'queue'");
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
};
