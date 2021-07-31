class Stack {
  constructor(stack = ["jules", "vincent", "mia"]) {
    this.stack = stack;
  }

  add(value) {
    this.stack.push(value);
  }

  get() {
    if (!this.stack.length) return "No patients";
    return this.stack.pop();
  }
}

const stack = new Stack();
export default stack;
