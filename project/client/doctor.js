import {
  setupCurrentPatient,
  getNextPatient,
  addResolution,
  findResolution,
  deletePatient,
} from "./callbacks/callbacks.js";

const nextPatientBtn = document.querySelector("#next-btn");
const addResolutionForm = document.querySelector(".add-resolution");
const findResolutionForm = document.querySelector(".find-resolution");
const deletePatientBtn = document.querySelector("#delete-btn");

document.addEventListener("DOMContentLoaded", setupCurrentPatient);
nextPatientBtn.addEventListener("click", getNextPatient);
addResolutionForm.addEventListener("submit", addResolution);
findResolutionForm.addEventListener("submit", findResolution);
deletePatientBtn.addEventListener("click", deletePatient);
