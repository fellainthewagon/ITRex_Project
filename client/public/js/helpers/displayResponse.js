import { setToken, setId } from "../utils/index.js";
import config from "../../config/config.js";
const { host, protocol } = config;
const port = 5000;

const errMessage = document.querySelector(".fail-msg");
const failMessage = document.querySelector(".fail-msg");

async function displayRegisterResponse(response) {
  const data = await response.json();

  if (response.status >= 400) {
    errMessage.innerText = data.message;
    errMessage.style.display = "block";
  } else {
    location.href = `${protocol}://${host}:${port}/login`;
  }

  setTimeout(() => {
    errMessage.style.display = "none";
  }, 4000);
}

async function displayLoginResponse(response) {
  const data = await response.json();

  if (response.status >= 400) {
    failMessage.innerText = data.message;
    failMessage.style.display = "block";
  } else if (response.status === 200) {
    setId(data.user.id);
    setToken(data.token);
    location.href = `${protocol}://${host}:${port}/profile`;
  }

  setTimeout(() => {
    failMessage.style.display = "none";
  }, 4000);
}

export { displayRegisterResponse, displayLoginResponse };
