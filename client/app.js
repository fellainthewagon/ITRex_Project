const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(path.resolve(), "public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/public/html/profile.html");
});

app.get("/doctor", (req, res) => {
  res.sendFile(__dirname + "/public/html/doctor.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/html/register.html");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/html/login.html");
});

app.post("/login", (req, res) => {
  res.redirect("/profile");
});

app.listen(5000, () => console.log("server has been started"));
