import config from "./config/config.js";

const form = document.querySelector(".register-form");
const confimMessage = document.querySelector(".confirm-message");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password_confirm");

form.addEventListener("submit", async (e) => {
  if (password.value !== passwordConfirm.value) {
    confimMessage.innerText = "Password mismatch!";
    confimMessage.style.color = "red";
    return;
  }

  const registerData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  await sendRegisterData(registerData, config);
});

async function sendRegisterData(data, { protocol, host, port }) {
  const url = `${protocol}://${host}:${port}/api/register`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
