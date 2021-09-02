import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import displayError from "./error/displayError.js";
import user from "./services/user.js";

const showCurrentPatient = document.querySelector(".current-patient");
const showResolution = document.querySelector(".show-resolution");
const resolutionInput = document.querySelector("#resolution");
const searchInputUser = document.querySelector("#search-input");
const findInputDoctor = document.querySelector("#find-patient-doctor");

const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");

function formatter(data) {
  return data.toLowerCase().trim();
}

function clearInputs() {
  resolutionInput.value = findInputDoctor.value = searchInputUser.value = "";
}
class Handlers {
  constructor(resolution, queue, displayError) {
    this.resolution = resolution;
    this.queue = queue;
    this.displayError = displayError;

    this.patientId;
    this.data;
  }

  getUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const { id, name, email } = await user.getUser(token);

      nameField.innerText = name;
      emailField.innerText = email;
      this.patientId = id;
    } catch (error) {
      this.displayError(error);
    }
  };

  addToQueue = async () => {
    try {
      await this.queue.add(this.patientId, nameField.innerText);
    } catch (error) {
      this.displayError(error);
    }
  };

  currentPatient = async () => {
    try {
      this.data = this.data || (await this.queue.getCurrent());

      showCurrentPatient.innerText = this.data.name || this.data.message;
    } catch (error) {
      this.displayError(error);
    }
  };

  nextPatient = async () => {
    try {
      this.data = await this.queue.getNext();

      showCurrentPatient.innerText = this.data.name || this.data.message;
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
      const search = formatter(searchInputUser.value);
      clearInputs();

      const { patient_id, resolution, message } = await this.resolution.find(
        search
      );

      this.patientId = patient_id || null;
      showResolution.innerText = resolution || message;
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
