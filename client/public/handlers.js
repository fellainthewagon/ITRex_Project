import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import displayError from "./error/displayError.js";

const showCurrentPatient = document.querySelectorAll(".current-patient");
const addPatientInput = document.querySelector("#add-patient");
const resolutionInput = document.querySelector("#resolution");
const showResolution = document.querySelectorAll(".show-resolution");
const findInputQueue = document.querySelector("#find-patient-queue");
const findInputDoctor = document.querySelector("#find-patient-doctor");

class Handlers {
  constructor(resolution, queue, displayError) {
    this.resolution = resolution;
    this.queue = queue;
    this.displayError = displayError;

    this.name;
    this.current;
  }

  setupCurrentPatient = async () => {
    try {
      this.current = await this.queue.getCurrent();
      showCurrentPatient.forEach((item) => {
        item.innerText = this.current.key || this.current.message;
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  getNextPatient = async () => {
    try {
      this.current = await this.queue.next();
      showCurrentPatient.forEach((item) => {
        item.innerText = this.current.key || this.current.message;
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  addPatientToQueue = async (e) => {
    e.preventDefault();
    try {
      const name = addPatientInput.value.toLowerCase().trim();
      await this.queue.add({ key: name });
      addPatientInput.value = "";
      if (!this.current.key) {
        this.current.key = name;
        showCurrentPatient.forEach((item) => {
          item.innerText = name;
        });
      }
    } catch (error) {
      this.displayError(error);
    }
  };

  addResolution = async (e) => {
    e.preventDefault();
    try {
      const { key } = await this.queue.getCurrent();
      if (!key) return;
      await this.resolution.add(key, { resolution: resolutionInput.value });
      resolutionInput.value = "";
    } catch (error) {
      this.displayError(error);
    }
  };

  findResolution = async (e) => {
    e.preventDefault();
    try {
      const value = findInputQueue.value || findInputDoctor.value;
      this.name = value.toLowerCase().trim();
      findInputQueue.value = findInputDoctor.value = "";

      const { resolution, message } = await this.resolution.find(this.name);
      showResolution.forEach((item) => {
        item.innerText = resolution || message;
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  deleteResolution = async () => {
    try {
      if (!this.name) return;
      await this.resolution.delete(this.name);
      this.name = null;
      showResolution.forEach((item) => {
        item.innerText = "Resolution successfully deleted";
      });
    } catch (error) {
      this.displayError(error);
    }
  };
}
export default new Handlers(resolution, queue, displayError);
