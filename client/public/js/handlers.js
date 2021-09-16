import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import user from "./services/user.js";
import doctor from "./services/doctor.js";
import displayError from "./helpers/displayError.js";
import {
  formatter,
  jumpToStartPage,
  addResolutionsToPage,
  showPopup,
} from "./utils/index.js";

const showCurrentPatient = document.querySelector(".current-patient");
const resolutionInput = document.querySelector("#resolution");
const searchInput = document.querySelector("#search-input");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const dobField = document.querySelector("#dob");
const resolutionsWrapper = document.querySelector(".resolutions-wrapper");
const popup = document.querySelector(".popup");
const popupWrapper = document.querySelector(".popupwrapper");

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
      const profile = await user.getUser();

      if (!profile) {
        return jumpToStartPage();
      }

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
      const data = await doctor.getDoctor();

      if (!data) {
        return jumpToStartPage();
      }

      doctorName.innerText = data.name;
      specialization.innerText = data.specialization.specialization;
    } catch (error) {
      this.displayError(error);
    }
  };

  addToQueue = async (specialization) => {
    try {
      await this.queue.add(
        this.profile.id,
        nameField.innerText,
        specialization
      );
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
      if (!this.data.name || !this.data.id) return;
      const { name } = await this.queue.getCurrent();
      if (!name) return;

      const resolution = resolutionInput.value;
      await this.resolution.add(this.data.id, {
        resolution,
      });

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

      const jwt = localStorage.getItem("doctor-jwt");
      const data = await this.resolution.find(search, jwt);

      const { resolutions, patients, message } = data;

      if (message) {
        resolutionsWrapper.innerHTML = message;
        return;
      }

      if (patients) {
        // TODO
      }

      resolutionsWrapper.innerHTML = "";
      resolutions.forEach((resolution) => {
        addResolutionsToPage(resolutionsWrapper, resolution);
      });
      this.findPatientId = resolutions[0].patient_id || null;
    } catch (error) {
      this.displayError(error);
    }
  };

  findResolutionForPatient = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("jwt");
      const data = await this.resolution.find(nameField.innerText, jwt);

      const { resolutions, patients, message } = data;

      if (message) {
        resolutionsWrapper.innerHTML = message;
        return;
      }

      if (patients) {
        // TODO
      }

      resolutionsWrapper.innerHTML = "";
      resolutions.forEach((resolution) => {
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
      const jwt = localStorage.getItem("doctor-jwt");
      await user.logout(jwt);
      localStorage.removeItem("doctor-jwt");
      jumpToStartPage();
    } catch (error) {
      this.displayError(error);
    }
  };

  logoutPatient = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("jwt");
      await user.logout(jwt);
      localStorage.removeItem("jwt");
      jumpToStartPage();
    } catch (error) {
      this.displayError(error);
    }
  };
}
export default new Handlers(resolution, queue, displayError);
