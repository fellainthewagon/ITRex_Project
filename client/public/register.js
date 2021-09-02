import user from "./services/user.js";

const form = document.querySelector(".register-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password_confirm");
const confimMessage = document.querySelector(".confirm-message");
const errMessage = document.querySelector(".fail-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (password.value !== passwordConfirm.value) {
    confimMessage.innerText = "Password mismatch!";
    confimMessage.style.color = "red";
    return;
  }

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await user.sendData(data, "register");

    await displayResult(response);
  } catch (error) {
    console.log(error);
  }
});

async function displayResult(response) {
  const data = await response.json();

  if (response.status === 409) {
    errMessage.innerText = data.message;
    errMessage.style.display = "block";
  } else {
    window.location.href = "http://localhost:5000/login";
  }

  setTimeout(() => {
    errMessage.style.display = "none";
  }, 4000);
}
