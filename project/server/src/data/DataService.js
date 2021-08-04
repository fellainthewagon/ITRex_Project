// import { promises as fs } from "fs";

// import path from "path";
// import { fileURLToPath } from "url";

let storage = [
  { name: "butch", resolution: "broken nose, a lot of blood on his face" },
  { name: "jules", resolution: "looks very good and cheerful" },
];
let queue = [
  { name: "mia" },
  { name: "vincent" },
  { name: "jules" },
  { name: "marcellos" },
  { name: "butch" },
  { name: "zed" },
];

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const pathS = path.join(__dirname, "storage.json");
// const pathQ = path.join(__dirname, "queue.json");

class DataService {
  constructor() {
    // this.fs = fs;
  }

  async getFirst() {
    // const queue = await this.#getData(pathQ);
    return queue[0];
  }

  async saveToStorage(value) {
    // const storage = await this.#getData(pathS);
    storage.push(value);
    // await this.#saveData(pathS, storage);
  }

  async findByNameAndDelete(name) {
    // let storage = await this.#getData(pathS);
    storage = storage.filter((item) => item.name !== name);
    // await this.#saveData(pathS, storage);
  }

  async findByName(name) {
    // const storage = await this.#getData(pathS);
    return storage.find((item) => item.name === name);
  }

  async pushToQueue(value) {
    // const queue = await this.#getData(pathQ);
    if (queue.find((item) => item.name === value.name)) {
      queue = queue.filter((item) => item.name !== value.name);
      queue.push(value);
      return;
    }
    queue.push(value);
    // await this.#saveData(pathQ, queue);
  }

  async getNext() {
    // const queue = await this.#getData(pathQ);
    queue.shift();
    // await this.#saveData(pathQ, queue);
    return queue[0];
  }

  // create for testing
  async getAllpersons() {
    return queue;
  }

  async destroyQueue() {
    queue = [];
  }

  async getAllpatients() {
    return storage;
  }

  async destroyStorage() {
    storage = [];
  }

  // async #getData(path) {
  //   return JSON.parse(await this.fs.readFile(path, "utf-8"));
  // }

  // async #saveData(path, data) {
  //   const json = JSON.stringify(data);
  //   await this.fs.writeFile(path, json);
  // }
}
module.exports = new DataService();
