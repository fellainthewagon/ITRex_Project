import config from "../../config/config.js";

const { host, protocol, clientPort } = config;
const popup = document.querySelector(".popup");
const popupWrapper = document.querySelector(".popupwrapper");

function formatter(data) {
  return data.toLowerCase().trim();
}

function showPopup(text) {
  popup.innerText = text;
  popupWrapper.style.cssText = "display: flex";
  setTimeout(() => {
    popupWrapper.style.cssText = "display: none";
  }, 4000);
}

function jumpToStartPage() {
  location.replace(`${protocol}://${host}:${clientPort}`);
}

export { formatter, jumpToStartPage, showPopup };
