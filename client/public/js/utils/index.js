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

export {
  formatter,
  getUserDataFromLS,
  jumpToStartPage,
  deleteUserDataFomLS,
  setUserDataToLS,
};
