class Queue {
  constructor(queue = ["jules", "vincent", "mia"]) {
    this.queue = queue;
  }

  add(value) {
    if (this.queue.indexOf(value) >= 0) return;
    this.queue.push(value);
  }

  get() {
    return !this.queue.length ? "The queue is empty" : this.queue[0];
  }

  next() {
    return !this.queue.length ? "No patients" : this.queue.shift();
  }
}

const queue = new Queue();
export default queue;
