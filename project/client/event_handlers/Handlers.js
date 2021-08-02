import storageService from "../services/StorageService.js";
import queueService from "../services/QueueService.js";

const showCurrentPatient = document.querySelector(".current-patient");
const addPatientInput = document.querySelector("#add-patient");
const resolutionInput = document.querySelector("#resolution");
const showResolution = document.querySelector(".show-resolution");
const findPatientInput = document.querySelector("#find-patient");

let patientName;
let firstPatient;

class Handlers {
  async setupCurrentPatient() {
    firstPatient = await queueService.getFirst();
    showCurrentPatient.innerText = firstPatient.name || firstPatient.message;
  }

  async getNextPatient() {
    firstPatient = await queueService.next();
    showCurrentPatient.innerText = firstPatient.name || firstPatient.message;
  }

  async addPatientToQueue(e) {
    e.preventDefault();
    const name = addPatientInput.value.toLowerCase().trim();
    await queueService.add({ name });
    addPatientInput.value = "";
    if (!firstPatient.name) {
      showCurrentPatient.innerText = name;
    }
  }

  async addResolution(e) {
    e.preventDefault();
    const resolution = resolutionInput.value;
    resolutionInput.value = "";
    if (!firstPatient) return;
    await storageService.addResolution({
      name: firstPatient.name,
      resolution,
    });
  }

  async findResolution(e) {
    e.preventDefault();
    patientName = findPatientInput.value.toLowerCase().trim();
    findPatientInput.value = "";
    const data = await storageService.findResolution(patientName);
    showResolution.innerText = data.resolution || data.message;
  }

  async deleteResolution() {
    if (!patientName) return;
    const data = await storageService.deleteResolution(patientName);
    showResolution.innerText = data.message;
  }
}

export default new Handlers();
