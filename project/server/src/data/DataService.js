import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathS = path.join(__dirname, "storage.json");
const pathQ = path.join(__dirname, "queue.json");

class DataService {
  constructor() {
    this.fs = fs;
  }
  // add patient (resolution)
  async saveToStorage(value) {
    const data = await this.#getData(pathS);
    data.push(value);
    await this.#saveData(pathS, data);
  }
  // delete patient
  async findByNameAndDelete(name) {
    let data = await this.#getData(pathS);
    data = data.filter((item) => item.name !== name);
    await this.#saveData(pathS, data);
  }
  // find patient (resolution)
  async findByName(name) {
    const data = await this.#getData(pathS);
    return data.find((item) => item.name === name);
  }

  async pushToQueue(value) {
    const data = await this.#getData(pathQ);
    data.push(value);
    await this.#saveData(pathQ, data);
  }
  // next patient
  async shiftFromQueue() {
    const data = await this.#getData(pathQ);
    const person = data.shift();
    await this.#saveData(pathQ, data);
    return person;
  }

  async #getData(path) {
    return JSON.parse(await this.fs.readFile(path, "utf-8"));
  }

  async #saveData(path, data) {
    await this.fs.writeFile(path, JSON.stringify(data));
  }
}
export default new DataService();
