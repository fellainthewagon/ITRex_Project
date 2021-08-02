import express, { json, urlencoded } from "express";
import cors from "cors";
import personsRouter from "./components/persons/personsRouter.js";
import patientsRouter from "./components/patients/patientsRouter.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/", personsRouter);
app.use("/", patientsRouter);

// app.use(errorHandler);

export default app;
