import user from "../services/user.js";
import displayError from "../helpers/displayError.js";
import { formatter } from "../utils/index.js";
import config from "../../config/config.js";

const { host, protocol, clientPort } = config;

const errMessage = document.querySelector(".fail-msg");
const form = document.querySelector(".register-form");
const name = document.querySelector("#name");
const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password_confirm");
const confimMessage = document.querySelector(".confirm-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (password.value !== passwordConfirm.value) {
    confimMessage.innerText = "Password mismatch!";
    confimMessage.style.color = "red";
    return;
  }

  const userData = {
    name: name.value,
    dob: dob.value,
    gender: gender.value,
    email: formatter(email.value),
    password: formatter(password.value),
  };

  try {
    const response = await user.sendData(userData, "register");
    const data = await response.json();

    if (response.status >= 400) {
      errMessage.innerText = data.message;
      errMessage.style.display = "block";

      setTimeout(() => {
        errMessage.style.display = "none";
      }, 4000);
    } else {
      location.href = `${protocol}://${host}:${clientPort}/login`;
    }
  } catch (error) {
    displayError(error);
  }
});
