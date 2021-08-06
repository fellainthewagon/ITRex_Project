const express = require("express");
const morgan = require("morgan");
const { errorHandler } = require("./components/middleware/validators");

const queueRouter = require("./components/queue/queueRouter");
const resolutionsRouter = require("./components/resolutions/resolutionsRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, PUTCH, DELETE, GET");
  next();
});

app.use("/api", queueRouter);
app.use("/api", resolutionsRouter);

app.use(errorHandler);

module.exports = app;
