import user from "./services/user.js";
import displayError from "./helpers/displayError.js";
import { displayRegisterResponse } from "./helpers/displayResponse.js";
import { formatter } from "./utils/index.js";

const form = document.querySelector(".register-form");
const name = document.querySelector("#name");
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

  const data = {
    name: formatter(name.value),
    email: formatter(email.value),
    password: formatter(password.value),
  };

  try {
    const response = await user.sendData(data, "register");

    await displayRegisterResponse(response);
  } catch (error) {
    displayError(error);
  }
});
