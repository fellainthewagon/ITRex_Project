import storageService from "../services/StorageService.js";
import queueService from "../services/QueueService.js";
import ttlStorage from "../services/TTLStorage.js";

const showCurrentPatient = document.querySelectorAll(".current-patient");
const addPatientInput = document.querySelector("#add-patient");
const resolutionInput = document.querySelector("#resolution");
const showResolution = document.querySelectorAll(".show-resolution");
const findInputQueue = document.querySelector("#find-patient-queue");
const findInputDoctor = document.querySelector("#find-patient-doctor");

let patientName;
let firstPatient;

class Handlers {
  async setupCurrentPatient() {
    firstPatient = await queueService.getFirst();
    showCurrentPatient.forEach((item) => {
      item.innerText = firstPatient.name || firstPatient.message;
    });
  }

  async getNextPatient() {
    firstPatient = await queueService.next();
    showCurrentPatient.forEach((item) => {
      item.innerText = firstPatient.name || firstPatient.message;
    });
  }

  async addPatientToQueue(e) {
    e.preventDefault();
    const name = addPatientInput.value.toLowerCase().trim();
    await queueService.add({ name });
    addPatientInput.value = "";
    if (!firstPatient.name) {
      showCurrentPatient.forEach((item) => {
        item.innerText = name;
      });
    }
  }

  async addResolution(e) {
    e.preventDefault();
    const resolution = resolutionInput.value;
    resolutionInput.value = "";
    firstPatient = await queueService.getFirst();
    if (!firstPatient.name) return;
    await ttlStorage.setData({ name: firstPatient.name, resolution });
  }

  async findResolution(e) {
    e.preventDefault();
    patientName = findInputQueue.value
      ? findInputQueue.value.toLowerCase().trim()
      : findInputDoctor.value.toLowerCase().trim();
    findInputQueue.value = findInputDoctor.value = "";

    const data = await ttlStorage.getData(patientName);
    showResolution.forEach((item) => {
      item.innerText = data.resolution || data.message;
    });
  }

  async deleteResolution() {
    if (!patientName) return;
    const data = await ttlStorage.deleteData(patientName);
    showResolution.forEach((item) => {
      item.innerText = data.message;
    });
  }
}
export default new Handlers();
