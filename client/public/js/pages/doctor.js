import handlers from "../handlers.js";
import displayError from "../helpers/displayError.js";
import user from "../services/user.js";
import { jumpToStartPage } from "../utils/index.js";

const nextPatientBtn = document.querySelector(".next-patient");
const addResolutionForm = document.querySelector(".set-resolution");
const findResolutionForm = document.querySelector(".find-resolution");
const logout = document.querySelector(".logout");

document.addEventListener("DOMContentLoaded", handlers.currentPatient);
document.addEventListener("DOMContentLoaded", handlers.getDoctor);
nextPatientBtn.addEventListener("click", handlers.nextPatient);
addResolutionForm.addEventListener("submit", handlers.addResolution);
findResolutionForm.addEventListener("submit", handlers.findResolutionAndDelete);
logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const jwt = localStorage.getItem("doctor-jwt");

    await user.logout(jwt);
    localStorage.removeItem("doctor-jwt");

    jumpToStartPage();
  } catch (error) {
    displayError(error);
  }
});
