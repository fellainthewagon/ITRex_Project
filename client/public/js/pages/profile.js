import handlers from "../handlers.js";

const findResolutionForm = document.querySelector(".find-resolution");
const addPatientBtn = document.querySelector(".add-patient");
const logout = document.querySelector(".logout");

document.addEventListener("DOMContentLoaded", handlers.getUser);
<<<<<<< HEAD
addPatientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const specialization = e.target.elements.specialization.value;
  handlers.addToQueue(specialization);
});
findResolutionForm.addEventListener(
  "submit",
  handlers.findResolutionForPatient
);
=======
addPatientBtn.addEventListener("click", handlers.addToQueue);
findResolutionForm.addEventListener("submit", handlers.findResolution);
>>>>>>> faf34a66d5bf9c8822039045afbfca170d1b9f6a
logout.addEventListener("click", handlers.logout);
