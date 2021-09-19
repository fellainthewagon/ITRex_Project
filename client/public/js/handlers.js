import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import user from "./services/user.js";
import displayError from "./helpers/displayError.js";
import {
  formatter,
  deleteUserDataFomLS,
  jumpToStartPage,
  getUserDataFromLS,
  addResolutionsToPage,
  getDoctorIdFromLS,
  showPopup,
} from "./utils/index.js";

const showCurrentPatient = document.querySelector(".current-patient");
const resolutionInput = document.querySelector("#resolution");
const searchInput = document.querySelector("#search-input");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const dobField = document.querySelector("#dob");
const addedMessage = document.querySelector(".added-message");
const resolutionsWrapper = document.querySelector(".resolutions-wrapper");
const popup = document.querySelector(".popup");
const popupWrapper = document.querySelector(".popupwrapper");

const addedResolutionMessage = document.querySelector(
  ".added-resolution-message"
);

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

  addToQueue = async () => {
    try {
      const response = await this.queue.add(
        this.profile.id,
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

      const response = await this.resolution.add(this.data.id, {
        resolution,
      });

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
      const res = await this.resolution.find(search);
      if (res.message || res.length === 0) {
        resolutionsWrapper.innerHTML = res.message || "Resolution not found";
        return;
      }
      resolutionsWrapper.innerHTML = "";
      res.forEach((resolution) => {
        addResolutionsToPage(resolutionsWrapper, resolution);
      });
      this.findPatientId = res[0].patient_id || null;
    } catch (error) {
      this.displayError(error);
    }
  };

  findResolutionForPatient = async (e) => {
    e.preventDefault();
    try {
      const res = await this.resolution.find();
      if (res.message || res.length === 0) {
        resolutionsWrapper.innerHTML = res.message || "Resolution not found";
        return;
      }
      resolutionsWrapper.innerHTML = "";
      res.forEach((resolution) => {
        addResolutionsToPage(resolutionsWrapper, resolution);
      });
    } catch (error) {
      this.displayError(error);
    }
  };

  deleteResolution = async () => {
    try {
      if (!this.findPatientId) return;
      const response = await this.resolution.delete(this.findPatientId);
      this.name = null;
      const deleted = "Resolutions deleted";
      const noToDelete = "No your resolutions for delete";
      if (response.status >= 400) {
        showPopup(popupWrapper, popup, noToDelete);
        return;
      }
      showPopup(popupWrapper, popup, deleted);
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
