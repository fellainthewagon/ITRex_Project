const express = require("express");

const cors = require("cors");
const personsRouter = require("./components/persons/personsRouter");
const patientsRouter = require("./components/patients/patientsRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", personsRouter);
app.use("/", patientsRouter);

// app.use(errorHandler);

module.exports = app;
