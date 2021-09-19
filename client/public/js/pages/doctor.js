import {
  CANNOT_SET_RESOLUTION,
  EMPTY_QUEUE,
  RESOLUTION_DELETED,
} from "../constants/index.js";
import displayError from "../helpers/displayError.js";
import queue from "../services/queue.js";
import resolution from "../services/resolution.js";
import user from "../services/user.js";
import { formatter, jumpToStartPage, showPopup } from "../utils/index.js";

const nextPatientBtn = document.querySelector(".next-patient");
const addResolutionForm = document.querySelector(".set-resolution");
const findResolutionForm = document.querySelector(".find-resolution");
const logout = document.querySelector(".logout");
const showCurrentPatient = document.querySelector(".current-patient");
const specialization = document.querySelector(".specialization");
const doctorName = document.querySelector(".doctor-name");
const resolutionInput = document.querySelector("#resolution");
const searchInput = document.querySelector("#search-input");
const tbody = document.querySelector("#tbody");

// load doctor personal data and current patient
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await user.getDoctor();

    doctorName.innerText = "Doctor: " + data.name;
    specialization.innerText =
      "Specialization: " + data.specialization.specialization;

    const patient = await queue.getCurrent();

    showCurrentPatient.innerText = patient ? patient.name : EMPTY_QUEUE;
  } catch (error) {
    displayError(error);
  }
});

// next patient logic
nextPatientBtn.addEventListener("click", async () => {
  try {
    if (showCurrentPatient.innerText === EMPTY_QUEUE) return;

    const patient = await queue.getNext();

    showCurrentPatient.innerText = patient ? patient.name : EMPTY_QUEUE;
  } catch (error) {
    displayError(error);
  }
});

// add resolution for current patient
addResolutionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const patient = await queue.getCurrent();
    if (!patient) return showPopup(CANNOT_SET_RESOLUTION);

    await resolution.add(patient.id, {
      resolution: resolutionInput.value,
    });

    resolutionInput.value = "";
  } catch (error) {
    displayError(error);
  }
});

// find all resolution by patient name and delete selected one
findResolutionForm.addEventListener("submit", async (e) => {
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
          showPopup(RESOLUTION_DELETED);
          e.target.parentElement.parentElement.remove();
        }
      });
    });
  } catch (error) {
    displayError(error);
  }
});

// logout doctor
logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const jwt = localStorage.getItem("doctor-jwt");
    localStorage.removeItem("doctor-jwt");

    await user.logout(jwt);
    jumpToStartPage();
  } catch (error) {
    displayError(error);
  }
});
