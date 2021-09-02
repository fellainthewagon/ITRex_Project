import user from "./services/user.js";

const form = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const failMessage = document.querySelector(".fail-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await user.sendData(data, "login");
    const data = await response.json();

    if (response.status >= 400) {
      failMessage.innerText = data.message;
      failMessage.style.display = "block";
    } else if (response.status === 200) {
      localStorage.setItem("accessToken", data.token);
      window.location.href = "http://localhost:5000/profile";
    }

    setTimeout(() => {
      failMessage.style.display = "none";
    }, 4000);
  } catch (error) {
    console.log(error);
  }
});
