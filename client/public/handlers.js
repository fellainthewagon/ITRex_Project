import Resolution from "./resolution.js";
import Queue from "./queue.js";

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
    try {
      current = await Queue.getCurrent();
      showCurrentPatient.forEach((item) => {
        item.innerText = current.key || current.message;
      });
    } catch (error) {
      displayError(error);
    }
  }

  async getNextPatient() {
    try {
      current = await Queue.next();
      showCurrentPatient.forEach((item) => {
        item.innerText = current.key || current.message;
      });
    } catch (error) {
      displayError(error);
    }
  }

  async addPatientToQueue(e) {
    e.preventDefault();
    try {
      const name = addPatientInput.value.toLowerCase().trim();
      await Queue.add({ key: name });
      addPatientInput.value = "";
      if (!current.key) {
        current.key = name;
        showCurrentPatient.forEach((item) => {
          item.innerText = name;
        });
      }
    } catch (error) {
      displayError(error);
    }
  }

  async addResolution(e) {
    e.preventDefault();
    try {
      const { key } = await Queue.getCurrent();
      if (!key) return;
      await Resolution.add(key, { resolution: resolutionInput.value });
      resolutionInput.value = "";
    } catch (error) {
      displayError(error);
    }
  }

  async findResolution(e) {
    e.preventDefault();
    try {
      const value = findInputQueue.value || findInputDoctor.value;
      name = value.toLowerCase().trim();
      findInputQueue.value = findInputDoctor.value = "";

      const { resolution, message } = await Resolution.find(name);
      showResolution.forEach((item) => {
        item.innerText = resolution || message;
      });
    } catch (error) {
      displayError(error);
    }
  }

  async deleteResolution() {
    try {
      if (!name) return;
      const { message } = await Resolution.delete(name);
      name = null;
      showResolution.forEach((item) => {
        item.innerText = message;
      });
    } catch (error) {
      displayError(error);
    }
  }
}
export default new Handlers();

function displayError(error) {
  alert(
    `Ouch!\n` +
      `An error occurred while uploading data\n` +
      "Error: " +
      error.message
  );
}
