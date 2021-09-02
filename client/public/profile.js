import handlers from "./handlers.js";

const findResolutionForm = document.querySelector(".find-resolution");
const addPatientBtn = document.querySelector(".add-patient");

document.addEventListener("DOMContentLoaded", handlers.getUser);
addPatientBtn.addEventListener("click", handlers.addToQueue);
findResolutionForm.addEventListener("submit", handlers.findResolution);
