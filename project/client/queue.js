import { addPatient, findResolution } from "./callbacks/callbacks.js";

const addPatientForm = document.querySelector(".add-patient");
const findResolutionForm = document.querySelector(".find-resolution");

addPatientForm.addEventListener("submit", addPatient);
findResolutionForm.addEventListener("submit", findResolution);
