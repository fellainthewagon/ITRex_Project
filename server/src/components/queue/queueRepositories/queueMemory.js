module.exports = class QueueMemory {
  constructor() {
    this.queue = [];
  }

  async getFirstFromList() {
    return this.queue[0];
  }

  async getNextFromList() {
    this.queue.shift();
    return this.queue[0];
  }

  async addToList(data) {
    this.queue.push(data);
  }
};
