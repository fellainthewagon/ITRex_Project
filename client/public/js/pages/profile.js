import handlers from "../handlers.js";

const findResolutionForm = document.querySelector(".find-resolution");
const addPatientForm = document.querySelector(".add-form");
const logout = document.querySelector(".logout");

document.addEventListener("DOMContentLoaded", handlers.getUser);
addPatientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const specialization = e.target.elements.specialization.value;
  handlers.addToQueue(specialization);
});
findResolutionForm.addEventListener(
  "submit",
  handlers.findResolutionForPatient
);
logout.addEventListener("click", handlers.logoutPatient);
