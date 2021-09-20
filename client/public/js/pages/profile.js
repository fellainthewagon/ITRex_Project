import resolution from "../services/resolution.js";
import displayError from "../helpers/displayError.js";
import { jumpToStartPage, showPopup } from "../utils/index.js";
import user from "../services/user.js";
import queue from "../services/queue.js";

const findResolutionForm = document.querySelector(".find-resolution");
const addPatientForm = document.querySelector(".add-form");
const logout = document.querySelector(".logout");
const tbody = document.querySelector("#tbody");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const dobField = document.querySelector("#dob");

const profile = {};

// load personal patient data
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await user.getProfile();
    if (!data) return jumpToStartPage();

    nameField.innerText = data.name;
    emailField.innerText = "E-mail:  " + data.email;
    dobField.innerText = "Date of Birth:  " + data.dob.split("T")[0];
    profile.user = data;
  } catch (error) {
    displayError(error);
  }
});

// add patient to queue
addPatientForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const specialization = e.target.elements.specialization.value;

  try {
    await queue.add(profile.user.id, nameField.innerText, specialization);
  } catch (error) {
    displayError(error);
  }
});

// find patient resolutions
findResolutionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const jwt = localStorage.getItem("jwt");
    const data = await resolution.find(nameField.innerText, jwt);

    const { resolutions, message } = data;

    if (message) {
      tbody.innerHTML = "";
      return showPopup(message);
    }

    const body = resolutions
      .map((resolution) => {
        return `
          <tr>
            <th scope="row">${resolution.patientId}</th>
            <td>${resolution.resolutionId}</td>
            <td>${resolution.resolution}</td>
            <td>${resolution.createdData.split("T")[0]}</td>
            <td>${resolution.doctorName}</td>
            <td>${resolution.doctorSpecialization}</td>
          </tr>
        `;
      })
      .join("");

    tbody.innerHTML = body;
  } catch (error) {
    displayError(error);
  }
});

// logout patient
logout.addEventListener("click", async (e) => {
  e.preventDefault();
  const jwt = localStorage.getItem("jwt");

  try {
    await user.logout(jwt);

    localStorage.removeItem("jwt");
    jumpToStartPage();
  } catch (error) {
    displayError(error);
  }
});
