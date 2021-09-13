import config from "../../config/config.js";
const { host, protocol, clientPort } = config;

function formatter(data) {
  return data.toLowerCase().trim();
}

function getUserDataFromLS() {
  return localStorage.getItem("userId");
}

function setUserDataToLS(userId, doctorId) {
  localStorage.setItem("userId", userId);
  if (doctorId) {
    localStorage.setItem("doctorId", doctorId);
  }
}

function deleteUserDataFomLS() {
  localStorage.removeItem("userId");
  localStorage.removeItem("doctorId");
}

function jumpToStartPage() {
  location.replace(`${protocol}://${host}:${clientPort}`);
}

export {
  formatter,
  getUserDataFromLS,
  jumpToStartPage,
  deleteUserDataFomLS,
  setUserDataToLS,
};
