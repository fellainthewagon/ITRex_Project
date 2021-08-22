import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import displayError from "./error/displayError.js";

const showCurrentPatient = document.querySelectorAll(".current-patient");
const showResolution = document.querySelectorAll(".show-resolution");
const addPatientInput = document.querySelector("#add-patient");
const resolutionInput = document.querySelector("#resolution");
const findInputQueue = document.querySelector("#find-patient-queue");
const findInputDoctor = document.querySelector("#find-patient-doctor");

function formatter(data) {
  return data.toLowerCase().trim();
}

function clearInputs() {
  addPatientInput.value =
    resolutionInput.value =
    findInputDoctor.value =
    findInputQueue.value =
      "";
}
class Handlers {
  constructor(resolution, queue, displayError) {
    this.resolution = resolution;
    this.queue = queue;
    this.displayError = displayError;

    this.patientId;
    this.data;
  }

  setupCurrentPatient = async () => {
    try {
      this.data = this.data || (await this.queue.getCurrent());

      showCurrentPatient.forEach((item) => {
        item.innerText = this.data.name || this.data.message;
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  getNextPatient = async () => {
    try {
      this.data = await this.queue.next();

      showCurrentPatient.forEach((item) => {
        item.innerText = this.data.name || this.data.message;
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  addPatientToQueue = async (e) => {
    e.preventDefault();
    try {
      const name = formatter(addPatientInput.value);
      const patient = await this.queue.add({ name });

      if (!this.data.name) {
        this.data.name = patient.name;
        showCurrentPatient.forEach((item) => {
          item.innerText = this.data.name;
        });
      }

      this.data.id = patient.id;
      clearInputs();
    } catch (error) {
      this.displayError(error);
    }
  };

  addResolution = async (e) => {
    e.preventDefault();
    try {
      const { name } = await this.queue.getCurrent();
      if (!name) return;

      const resolution = formatter(resolutionInput.value);
      await this.resolution.add(this.data.id, { resolution });

      clearInputs();
    } catch (error) {
      this.displayError(error);
    }
  };

  findResolution = async (e) => {
    e.preventDefault();
    try {
      const search = formatter(findInputQueue.value || findInputDoctor.value);
      clearInputs();

      const { patientId, resolution, message } = await this.resolution.find(
        search
      );

      this.patientId = patientId || null;
      showResolution.forEach((item) => {
        item.innerText = resolution || message;
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  deleteResolution = async () => {
    try {
      if (!this.patientId) return;
      const response = await this.resolution.delete(this.patientId);
      this.name = null;

      if (response.status >= 400) return;
      showResolution.forEach((item) => {
        item.innerText = "Resolution deleted";
      });
    } catch (error) {
      this.displayError(error);
    }
  };
}
export default new Handlers(resolution, queue, displayError);
