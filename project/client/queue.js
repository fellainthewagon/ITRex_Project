import handlers from "./event_handlers/Handlers.js";

const addPatientForm = document.querySelector(".add-patient");
const findResolutionForm = document.querySelector(".find-resolution");

document.addEventListener("DOMContentLoaded", handlers.setupCurrentPatient);
addPatientForm.addEventListener("submit", handlers.addPatientToQueue);
findResolutionForm.addEventListener("submit", handlers.findResolution);
