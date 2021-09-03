function formatter(data) {
  return data.toLowerCase().trim();
}

function getToken() {
  return localStorage.getItem("accessToken");
}

function setToken(token) {
  return localStorage.setItem("accessToken", token);
}

export { formatter, getToken, setToken };
