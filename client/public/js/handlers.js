import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import user from "./services/user.js";
import displayError from "./helpers/displayError.js";
import {
  formatter,
  deleteUserDataFomLS,
  jumpToStartPage,
  getUserDataFromLS,
} from "./utils/index.js";

const showCurrentPatient = document.querySelector(".current-patient");
const showResolution = document.querySelector(".show-resolution");
const resolutionInput = document.querySelector("#resolution");
const searchInput = document.querySelector("#search-input");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const addedMessage = document.querySelector(".added-message");
const addedResolutionMessage = document.querySelector(
  ".added-resolution-message"
);

class Handlers {
  constructor(resolution, queue, displayError) {
    this.resolution = resolution;
    this.queue = queue;
    this.displayError = displayError;

    this.patientUserId;
    this.findPatientId;
    this.data;
  }

  getUser = async () => {
    try {
      const userId = getUserDataFromLS();
      if (!userId) {
        jumpToStartPage();
        return;
      }

      const response = await user.getUser(userId);
      if (response.status === 401) jumpToStartPage();

      const { id, name, email } = await response.json();

      nameField.innerText = name;
      emailField.innerText = email;
      this.patientUserId = id;
    } catch (error) {
      this.displayError(error);
    }
  };

  addToQueue = async () => {
    try {
      const response = await this.queue.add(
        this.patientUserId,
        nameField.innerText
      );
      if (response.status === 201) {
        addedMessage.innerText = "You have been added to the queue!";
        addedMessage.style.display = "block";

        setTimeout(() => {
          addedMessage.style.display = "none";
        }, 4000);
      }
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
      if (!this.data.name) return;
      this.data = await this.queue.getNext();

      showCurrentPatient.innerText = this.data.name || this.data.message;
    } catch (error) {
      this.displayError(error);
    }
  };

  addResolution = async (e) => {
    e.preventDefault();
    try {
      if (!this.data.name) return;
      const { name } = await this.queue.getCurrent();
      if (!name) return;

      const resolution = resolutionInput.value;

      if (!this.data.id) return;

      const response = await this.resolution.add(this.data.id, { resolution });

      if (response.status === 204) {
        addedResolutionMessage.innerText = "Resolution added!";
        addedResolutionMessage.style.display = "block";

        setTimeout(() => {
          addedResolutionMessage.style.display = "none";
        }, 4000);
      }

      resolutionInput.value = "";
    } catch (error) {
      this.displayError(error);
    }
  };

  findResolution = async (e) => {
    e.preventDefault();
    try {
      const search = formatter(searchInput.value);
      searchInput.value = "";

      const { patient_id, resolution, message } = await this.resolution.find(
        search
      );

      this.findPatientId = patient_id || null;
      showResolution.innerText = resolution || message;
    } catch (error) {
      this.displayError(error);
    }
  };

  deleteResolution = async () => {
    try {
      if (!this.findPatientId) return;
      const response = await this.resolution.delete(this.findPatientId);
      this.name = null;

      if (response.status >= 400) return;
      showResolution.innerText = "Resolution deleted";
    } catch (error) {
      this.displayError(error);
    }
  };

  logout = async (e) => {
    e.preventDefault();
    try {
      deleteUserDataFomLS();
      await user.logout();

      jumpToStartPage();
    } catch (error) {
      this.displayError(error);
    }
  };
}
export default new Handlers(resolution, queue, displayError);
