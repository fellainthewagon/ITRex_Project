import config from "../../config/config.js";
const { host, protocol } = config;
const port = 5000;

function formatter(data) {
  return data.toLowerCase().trim();
}

function getToken() {
  return localStorage.getItem("accessToken");
}

function setToken(token) {
  return localStorage.setItem("accessToken", token);
}

function getId() {
  return localStorage.getItem("userId");
}

function setId(id) {
  return localStorage.setItem("userId", id);
}

function jumpToStartPage() {
  location.replace(`${protocol}://${host}:${port}`);
}

export { formatter, getToken, setToken, jumpToStartPage, setId, getId };
