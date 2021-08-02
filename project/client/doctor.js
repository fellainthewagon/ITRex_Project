import handlers from "./event_handlers/Handlers.js";

const nextPatientBtn = document.querySelector("#next-btn");
const addResolutionForm = document.querySelector(".add-resolution");
const findResolutionForm = document.querySelector(".find-resolution");
const deletePatientBtn = document.querySelector("#delete-btn");

document.addEventListener("DOMContentLoaded", handlers.setupCurrentPatient);
nextPatientBtn.addEventListener("click", handlers.getNextPatient);
addResolutionForm.addEventListener("submit", handlers.addResolution);
findResolutionForm.addEventListener("submit", handlers.findResolution);
deletePatientBtn.addEventListener("click", handlers.deleteResolution);
