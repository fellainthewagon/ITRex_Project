import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import user from "./services/user.js";
import doctor from "./services/doctor.js";
import displayError from "./helpers/displayError.js";
import { formatter, jumpToStartPage, showPopup } from "./utils/index.js";

const showCurrentPatient = document.querySelector(".current-patient");
const resolutionInput = document.querySelector("#resolution");
const searchInput = document.querySelector("#search-input");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const dobField = document.querySelector("#dob");
const tbody = document.querySelector("#tbody");

const specialization = document.querySelector(".specialization");
const doctorName = document.querySelector(".doctor-name");

class Handlers {
  constructor() {
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
      displayError(error);
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
      displayError(error);
    }
  };

  addToQueue = async (specialization) => {
    try {
      await queue.add(this.profile.id, nameField.innerText, specialization);
    } catch (error) {
      displayError(error);
    }
  };

  currentPatient = async () => {
    try {
      this.data = this.data || (await queue.getCurrent());
      showCurrentPatient.innerText = this.data.name || this.data.message;
    } catch (error) {
      displayError(error);
    }
  };

  nextPatient = async () => {
    try {
      if (!this.data.name) return;
      this.data = await queue.getNext();
      showCurrentPatient.innerText = this.data.name || this.data.message;
    } catch (error) {
      displayError(error);
    }
  };

  addResolution = async (e) => {
    e.preventDefault();
    try {
      if (!this.data.name || !this.data.id) return;
      const { name } = await queue.getCurrent();
      if (!name) return;

      const resolution = resolutionInput.value;
      await resolution.add(this.data.id, {
        resolution,
      });

      resolutionInput.value = "";
    } catch (error) {
      displayError(error);
    }
  };

  findResolution = async (e) => {
    e.preventDefault();
    try {
      const search = formatter(searchInput.value);
      searchInput.value = "";

      const jwt = localStorage.getItem("doctor-jwt");
      const data = await resolution.find(search, jwt);

      const { resolutions, patients, message } = data;

      if (message) {
        showPopup(`Message from server:\n\n - ${message}`);
        return;
      }

      if (patients) {
        const names = patients
          .map((patient) => {
            return ` - ${patient.name}\n`;
          })
          .join("");

        showPopup(`Please, choose patient:\n${names}`);
        return;
      }

      const body = resolutions
        .map((resolution) => {
          return `
          <tr>
            <th scope="row">${resolution.patientId}</th>
            <td>${resolution.name}</td>
            <td>${resolution.resolutionId}</td>
            <td>${resolution.resolution}</td>
            <td>${resolution.createdData.split("T")[0]}</td>
            <td>${resolution.doctorName}</td>
            <td>${resolution.doctorSpecialization}</td>
            <td><button>Delete</button></td>
          </tr>
        `;
        })
        .join("");

      tbody.innerHTML = body;

      this.findPatientId = resolutions[0].patient_id || null;
    } catch (error) {
      displayError(error);
    }
  };

  deleteResolution = async () => {
    try {
      if (!this.findPatientId) return;
      const response = await resolution.delete(this.findPatientId);
      this.name = null;
      const deleted = "Resolutions deleted";
      const noToDelete = "No your resolutions for delete";
      if (response.status >= 400) {
        showPopup(noToDelete);
        return;
      }
      showPopup(deleted);
    } catch (error) {
      displayError(error);
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
      displayError(error);
    }
  };
}
export default new Handlers();
