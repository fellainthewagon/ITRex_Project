import handlers from "./public/Handlers.js";

const nextPatientBtn = document.querySelector("#next-btn");
const addResolutionForm = document.querySelector(".add-resolution");
const findResolutionForm = document.querySelectorAll(".find-resolution");
const deletePatientBtn = document.querySelector("#delete-btn");
const addPatientForm = document.querySelector(".add-patient");

document.addEventListener("DOMContentLoaded", handlers.setupCurrentPatient);
nextPatientBtn.addEventListener("click", handlers.getNextPatient);
addResolutionForm.addEventListener("submit", handlers.addResolution);
deletePatientBtn.addEventListener("click", handlers.deleteResolution);
addPatientForm.addEventListener("submit", handlers.addPatientToQueue);
findResolutionForm.forEach((item) => {
  item.addEventListener("submit", handlers.findResolution);
});
