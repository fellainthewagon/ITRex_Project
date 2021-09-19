const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const config = require("../config");

const queueRouter = require("./components/queue/queueRouter");
const resolutionsRouter = require("./components/resolutions/resolutionsRouter");
const authRouter = require("./components/auth/authRouter");
const profileRouter = require("./components/profile/profileRouter");
const doctorRouter = require("./components/doctor/doctorRouter");

const swaggerDocs = require("./doc/swaggerDocs");
const apiErrorsHandler = require("./middleware/apiErrorsHandler");
const db = require("./db");
const { PAGE_NOT_FOUND, IT_WORKS } = require("./constants");
const { clientUrl } = require("../config");
const deserializeUser = require("./middleware/deserializeUser");

const app = express();

/**
 * middleware
 */
app.use(cors({ origin: clientUrl }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(morgan(config.mode));
app.use(express.json());

/**
 * database connection
 */
db.sequelize
  .authenticate()
  .then(() => {
    global.console.log("...connected to DB!");
  })
  .catch((error) => global.console.log(error));

/**
 * routes
 */
app.use("/api/auth", authRouter);
app.use("/api/", deserializeUser);
app.use("/api/patients/queue", queueRouter);
app.use("/api/patients", resolutionsRouter);
app.use("/api/profile", profileRouter);
app.use("/api/doctor", doctorRouter);

/**
 * API face
 */
app.get("/", (req, res) => res.send(IT_WORKS));
app.get("*", (req, res) => res.send(PAGE_NOT_FOUND));

app.use(apiErrorsHandler);

module.exports = app;
