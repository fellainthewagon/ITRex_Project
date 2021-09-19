import user from "../services/user.js";
import displayError from "../helpers/displayError.js";
import { formatter } from "../utils/index.js";
import config from "../../config/config.js";

const { host, protocol, clientPort } = config;

const failMessage = document.querySelector(".fail-msg");
const form = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: formatter(email.value),
    password: formatter(password.value),
  };

  try {
    const response = await user.sendData(loginData, "login");
    const data = await response.json();

    if (response.status >= 400) {
      failMessage.innerText = data.message;
      failMessage.style.display = "block";

      setTimeout(() => {
        failMessage.style.display = "none";
      }, 4000);
      return;
    }

    if (data.user.role === "doctor") {
      localStorage.setItem("doctor-jwt", data.token);
      location.href = `${protocol}://${host}:${clientPort}/doctor`;
      return;
    }

    localStorage.setItem("jwt", data.token);
    location.href = `${protocol}://${host}:${clientPort}/profile`;
  } catch (error) {
    displayError(error);
  }
});
