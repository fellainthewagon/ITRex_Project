import config from "../../config/config.js";
const { host, protocol } = config;
const port = 5000;

function formatter(data) {
  return data.toLowerCase().trim();
}

function getUserDataFromLS() {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  return { userId, token };
}

function setUserDataToLS(userId, token) {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userId", userId);
}

function deleteUserDataFomLS() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
}

function jumpToStartPage() {
  location.replace(`${protocol}://${host}:${port}`);
}

export {
  formatter,
  getUserDataFromLS,
  jumpToStartPage,
  deleteUserDataFomLS,
  setUserDataToLS,
};
