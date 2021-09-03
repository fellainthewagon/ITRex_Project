import handlers from "./handlers.js";

const nextPatientBtn = document.querySelector(".next-patient");
const addResolutionForm = document.querySelector(".set-resolution");
const findResolutionForm = document.querySelector(".find-resolution");
const deletePatientBtn = document.querySelector(".delete-resolution");

document.addEventListener("DOMContentLoaded", handlers.currentPatient);
nextPatientBtn.addEventListener("click", handlers.nextPatient);
addResolutionForm.addEventListener("submit", handlers.addResolution);
deletePatientBtn.addEventListener("click", handlers.deleteResolution);
findResolutionForm.addEventListener("submit", handlers.findResolution);
