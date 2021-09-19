import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import user from "./services/user.js";
import doctor from "./services/doctor.js";
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
const dobField = document.querySelector("#dob");
const addedMessage = document.querySelector(".added-message");

const addedResolutionMessage = document.querySelector(
  ".added-resolution-message"
);
const specialization = document.querySelector(".specialization");
const doctorName = document.querySelector(".doctor-name");

class Handlers {
  constructor(resolution, queue, displayError) {
    this.resolution = resolution;
    this.queue = queue;
    this.displayError = displayError;

    this.profile = {};
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
      const profile = await response.json();
      nameField.innerText = profile.name;
      emailField.innerText = profile.email;
      dobField.innerText = profile.dob.split("T")[0];
      this.profile = profile;
    } catch (error) {
      this.displayError(error);
    }
  };

  getDoctor = async () => {
    try {
      const userId = getUserDataFromLS();
      if (!userId) {
        jumpToStartPage();
        return;
      }
      const response = await doctor.getDoctor(userId);
      if (response.status === 401) jumpToStartPage();
      const res = await response.json();
      doctorName.innerText = res.name;
      specialization.innerText = res.specialization.specialization;
    } catch (error) {
      this.displayError(error);
    }
  };

  addToQueue = async (specialization) => {
    try {
      const response = await this.queue.add(
        this.profile.id,
        nameField.innerText,
        specialization
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
      const doctorId = localStorage.getItem("doctorId");
      this.data = this.data || (await this.queue.getCurrent(doctorId));
      showCurrentPatient.innerText = this.data.name || this.data.message;
    } catch (error) {
      this.displayError(error);
    }
  };

  nextPatient = async () => {
    try {
      if (!this.data.name) return;
      const doctorId = localStorage.getItem("doctorId");
      this.data = await this.queue.getNext(doctorId);
      showCurrentPatient.innerText = this.data.name || this.data.message;
    } catch (error) {
      this.displayError(error);
    }
  };

  addResolution = async (e) => {
    e.preventDefault();
    try {
      if (!this.data.name) return;
      const doctorId = localStorage.getItem("doctorId");
      const { name } = await this.queue.getCurrent(doctorId);
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
