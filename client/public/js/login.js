import user from "./services/user.js";
import { displayLoginResponse } from "./helpers/displayResponse.js";
import displayError from "./helpers/displayError.js";

const form = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await user.sendData(loginData, "login");

    displayLoginResponse(response);
  } catch (error) {
    displayError(error);
  }
});
