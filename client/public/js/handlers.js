import resolution from "./services/resolution.js";
import queue from "./services/queue.js";
import user from "./services/user.js";
import doctor from "./services/doctor.js";
import displayError from "./helpers/displayError.js";
import { formatter, jumpToStartPage, showPopup } from "./utils/index.js";

const showCurrentPatient = document.querySelector(".current-patient");
const resolutionInput = document.querySelector("#resolution");
const searchInput = document.querySelector("#search-input");
const tbody = document.querySelector("#tbody");

const specialization = document.querySelector(".specialization");
const doctorName = document.querySelector(".doctor-name");

class Handlers {
  constructor() {
    this.findPatientId;
    this.data;
  }

  getDoctor = async () => {
    try {
      const data = await doctor.getDoctor();

      if (!data) {
        return jumpToStartPage();
      }

      doctorName.innerText = "Doctor: " + data.name;
      specialization.innerText =
        "Specialization: " + data.specialization.specialization;
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

      await resolution.add(this.data.id, {
        resolution: resolutionInput.value,
      });

      resolutionInput.value = "";
    } catch (error) {
      displayError(error);
    }
  };

  findResolutionAndDelete = async (e) => {
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
          <tr id="del-${resolution.resolutionId}">
            <th scope="row">${resolution.patientId}</th>
            <td>${resolution.name}</td>
            <td id="">${resolution.resolutionId}</td>
            <td>${resolution.resolution}</td>
            <td>${resolution.createdData.split("T")[0]}</td>
            <td>${resolution.doctorName}</td>
            <td>${resolution.doctorSpecialization}</td>
            <td><button class="delete-btn">Delete</button></td>
          </tr>
        `;
        })
        .join("");

      tbody.innerHTML = body;
      const patientId = resolutions[0].patientId || null;

      const deleteBtn = document.querySelectorAll(".delete-btn");

      deleteBtn.forEach((resolutionLine) => {
        resolutionLine.addEventListener("click", async (e) => {
          const resolutionId =
            e.target.parentElement.parentElement.id.split("-")[1];

          const response = await resolution.delete(patientId, resolutionId);
          if (response.status === 404) {
            showPopup("No resolution you can delete");
            return;
          }

          if (response.status === 204) {
            showPopup("resolution deleted!");
            e.target.parentElement.parentElement.remove();
          }
        });
      });
    } catch (error) {
      displayError(error);
    }
  };
}
export default new Handlers();
