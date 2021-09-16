import config from "../../config/config.js";
const { host, protocol, clientPort } = config;

const errMessage = document.querySelector(".fail-msg");
const failMessage = document.querySelector(".fail-msg");

async function displayRegisterResponse(response) {
  const data = await response.json();

  if (response.status >= 400) {
    errMessage.innerText = data.message;
    errMessage.style.display = "block";
  } else {
    location.href = `${protocol}://${host}:${clientPort}/login`;
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
  }

  const { user, token } = data;

  if (user.role === "doctor") {
    localStorage.setItem("doctor-jwt", token);
    location.href = `${protocol}://${host}:${clientPort}/doctor`;
    return;
  }

  localStorage.setItem("jwt", token);
  location.href = `${protocol}://${host}:${clientPort}/profile`;

  setTimeout(() => {
    failMessage.style.display = "none";
  }, 4000);
}

export { displayRegisterResponse, displayLoginResponse };
