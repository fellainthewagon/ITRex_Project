import Resolution from "./Resolution.js";
import Queue from "./Queue.js";

const showCurrentPatient = document.querySelectorAll(".current-patient");
const addPatientInput = document.querySelector("#add-patient");
const resolutionInput = document.querySelector("#resolution");
const showResolution = document.querySelectorAll(".show-resolution");
const findInputQueue = document.querySelector("#find-patient-queue");
const findInputDoctor = document.querySelector("#find-patient-doctor");

let name;
let current;

class Handlers {
  async setupCurrentPatient() {
    current = await Queue.getCurrent();
    showCurrentPatient.forEach((item) => {
      item.innerText = current.key || current.message;
    });
  }

  async getNextPatient() {
    current = await Queue.next();
    showCurrentPatient.forEach((item) => {
      item.innerText = current.key || current.message;
    });
  }

  async addPatientToQueue(e) {
    e.preventDefault();
    const name = addPatientInput.value.toLowerCase().trim();
    await Queue.add({ key: name });
    addPatientInput.value = "";
    if (!current.key) {
      current.key = name;
      showCurrentPatient.forEach((item) => {
        item.innerText = name;
      });
    }
  }

  async addResolution(e) {
    e.preventDefault();
    const { key } = await Queue.getCurrent();
    if (!key) return;
    await Resolution.add(key, { resolution: resolutionInput.value });
    resolutionInput.value = "";
  }

  async findResolution(e) {
    e.preventDefault();
    name = findInputQueue.value
      ? findInputQueue.value.toLowerCase().trim()
      : findInputDoctor.value.toLowerCase().trim();
    findInputQueue.value = findInputDoctor.value = "";

    const { resolution, message } = await Resolution.find(name);
    showResolution.forEach((item) => {
      item.innerText = resolution || message;
    });
  }

  async deleteResolution() {
    if (!name) return;
    const { message } = await Resolution.delete(name);
    name = null;
    showResolution.forEach((item) => {
      item.innerText = message;
    });
  }
}
export default new Handlers();
