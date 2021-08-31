import config from "./config/config.js";

const form = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (e) => {
  const loginData = {
    email: email.value,
    password: password.value,
  };

  await sendLoginData(loginData, config);
});

async function sendLoginData(data, { protocol, host, port }) {
  const url = `${protocol}://${host}:${port}/api/login`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
