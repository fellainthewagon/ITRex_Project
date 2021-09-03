import { setToken } from "../utils/index.js";

const errMessage = document.querySelector(".fail-msg");
const failMessage = document.querySelector(".fail-msg");

async function displayRegisterResponse(response) {
  const data = await response.json();

  if (response.status >= 400) {
    errMessage.innerText = data.message;
    errMessage.style.display = "block";
  } else {
    window.location.href = "http://localhost:5000/login";
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
    setToken(data.token);
    window.location.href = "http://localhost:5000/profile";
  }

  setTimeout(() => {
    failMessage.style.display = "none";
  }, 4000);
}

export { displayRegisterResponse, displayLoginResponse };
