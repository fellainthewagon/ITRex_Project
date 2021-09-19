import config from "../../config/config.js";
const { host, protocol, clientPort } = config;

function formatter(data) {
  return data.toLowerCase().trim();
}

function getUserDataFromLS() {
  return localStorage.getItem("userId");
}

function setUserDataToLS(userId) {
  localStorage.setItem("userId", userId);
}

function deleteUserDataFomLS() {
  localStorage.removeItem("userId");
}

function jumpToStartPage() {
  location.replace(`${protocol}://${host}:${clientPort}`);
}

function addResolutionsToPage(resolutionsWrapper, resolution) {
  const resolutions = document.createElement("div");
  const resolutionText = document.createElement("h7");
  const cardNumber = document.createElement("h7");
  const resolutionDate = document.createElement("h7");
  const doctorName = document.createElement("h7");
  const specialization = document.createElement("h7");

  resolutions.className = "resolution";

  resolutionText.innerText = `Resolution: ${resolution.resolution}`;
  cardNumber.innerText = `Number of card: ${resolution.patient_id}`;
  resolutionDate.innerText = `Date of resolution: ${
    resolution.createdAt.split("T")[0]
  }`;
  specialization.innerText = `Specialization: ${resolution.doctor.specialization.specialization}`;
  doctorName.innerText = `Doctor: ${resolution.doctor.name}`;

  resolutions.append(specialization);
  resolutions.append(resolutionText);
  resolutions.append(cardNumber);
  resolutions.append(resolutionDate);
  resolutions.append(doctorName);
  resolutionsWrapper.append(resolutions);
  resolutionsWrapper.append(resolutions);
}

export {
  formatter,
  getUserDataFromLS,
  jumpToStartPage,
  deleteUserDataFomLS,
  setUserDataToLS,
};
