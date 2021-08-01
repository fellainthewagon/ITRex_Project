import {
  addPatient,
  findResolution,
  setupLastPatient,
} from "./handlers/handlers.js";

const addPatientForm = document.querySelector(".add-patient");
const findResolutionForm = document.querySelector(".find-resolution");

document.addEventListener("DOMContentLoaded", setupLastPatient);
addPatientForm.addEventListener("submit", addPatient);
findResolutionForm.addEventListener("submit", findResolution);
