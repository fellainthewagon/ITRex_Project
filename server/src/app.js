const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const config = require("../config");

const queueRouter = require("./components/queue/queueRouter");
const resolutionsRouter = require("./components/resolutions/resolutionsRouter");

const swaggerDocs = require("./doc/swaggerDocs");
const errorHandler = require("./middleware/errorHandler");
const db = require("./db");
const { PAGE_NOT_FOUND, IT_WORKS } = require("./constants/statusMessage");
const authRouter = require("./components/auth/authRouter");

const app = express();

/**
 * middleware
 */
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(morgan(config.mode));
app.use(express.json());

/**
 * database connection
 */
db.sequelize
  .authenticate(/* {force: true} */)
  .then(() => {
    global.console.log("...connected to DB!");
  })
  .catch((error) => global.console.log(error));

/**
 * routes
 */

app.use("/api/patients/queue", queueRouter);
app.use("/api/patients", resolutionsRouter);
app.use("/api/auth", authRouter);

/**
 * API face
 */
app.get("/", (req, res) => res.send(IT_WORKS));
app.get("*", (req, res) => res.send(PAGE_NOT_FOUND));

app.use(errorHandler);

module.exports = app;
