const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");

const queueRouter = require("./components/queue/queueRouter");
const resolutionsRouter = require("./components/resolutions/resolutionsRouter");

const swaggerDocs = require("./doc/swaggerDocs");
const errorHandler = require("./middleware/errorHandler");
const cors = require("./middleware/cors");

const app = express();

/**
 * middleware
 */
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors);

/**
 * routes
 */
app.use("/api/queue", queueRouter);
app.use("/api/patients", resolutionsRouter);

app.use(errorHandler);

module.exports = app;
