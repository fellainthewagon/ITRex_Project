import storage from "../classes/Storage.js";
import queue from "../classes/Queue.js";

const showCurrentPatient = document.querySelector(".current-patient");
const resolutionInput = document.querySelector("#resolution");
const findPatientInput = document.querySelector("#find-patient");
const showResolution = document.querySelector(".show-resolution");
const addPatientInput = document.querySelector("#add-patient");

let patientName;
let currentPatient = queue.next();

//   ======================================================

export function setupLastPatient() {
  showCurrentPatient.innerText = queue.get();
}

//   ======================================================

export function setupCurrentPatient() {
  showCurrentPatient.innerText = currentPatient;
}

//   ======================================================

export function getNextPatient() {
  currentPatient = queue.next();
  showCurrentPatient.innerText = currentPatient;
}

//   ======================================================

export function addResolution(e) {
  e.preventDefault();
  const resolution = resolutionInput.value;
  resolutionInput.value = "";
  if (currentPatient === "No patients") return;
  storage.addResolution({ name: currentPatient, resolution });
}

//   ======================================================

export function findResolution(e) {
  e.preventDefault();
  patientName = findPatientInput.value.toLowerCase().trim();
  findPatientInput.value = "";
  const resolution = storage.findResolution(patientName);
  showResolution.innerText = resolution;
}

//   ======================================================

export function deletePatient() {
  storage.deletePatient(patientName);
  showResolution.innerText = "";
}

//   ======================================================

export function addPatient(e) {
  e.preventDefault();
  queue.add(addPatientInput.value.toLowerCase().trim());
  showCurrentPatient.innerText = addPatientInput.value;
  addPatientInput.value = "";
}
