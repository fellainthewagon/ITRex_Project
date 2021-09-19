import handlers from "../handlers.js";

const findResolutionForm = document.querySelector(".find-resolution");
const addPatientBtn = document.querySelector(".add-patient");
const logout = document.querySelector(".logout");

document.addEventListener("DOMContentLoaded", handlers.getUser);
addPatientBtn.addEventListener("click", handlers.addToQueue);
findResolutionForm.addEventListener("submit", handlers.findResolution);
logout.addEventListener("click", handlers.logout);
