import handlers from "../handlers.js";
import resolution from "../services/resolution.js";
import displayError from "../helpers/displayError.js";
import { jumpToStartPage, showPopup } from "../utils/index.js";
import user from "../services/user.js";

const findResolutionForm = document.querySelector(".find-resolution");
const addPatientForm = document.querySelector(".add-form");
const logout = document.querySelector(".logout");
const tbody = document.querySelector("#tbody");
const nameField = document.querySelector("#name");

document.addEventListener("DOMContentLoaded", handlers.getUser);
addPatientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const specialization = e.target.elements.specialization.value;
  handlers.addToQueue(specialization);
});

findResolutionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const jwt = localStorage.getItem("jwt");
    const data = await resolution.find(nameField.innerText, jwt);

    const { resolutions, message } = data;

    if (message) {
      showPopup(message);
      return;
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
            <td><button>Delete</button></td>
          </tr>
        `;
      })
      .join("");

    tbody.innerHTML = body;
  } catch (error) {
    displayError(error);
  }
});

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
