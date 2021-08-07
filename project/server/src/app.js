const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { errorHandler } = require("./components/middleware/middlewares");

const queueRouter = require("./components/queue/queueRouter");
const resolutionsRouter = require("./components/resolutions/resolutionsRouter");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Clinic API",
      version: 1.0,
      description: "Really juicy API",
      contact: { name: "Rylkov Andrey", email: "fellainthewagon@gmail.com" },
    },
    servers: [{ url: "http://localhost:3000/api" }],
    tags: [
      {
        name: "queue",
      },
      {
        name: "resolutions",
      },
    ],
  },
  apis: [
    "./src/app.js",
    "./src/components/queue/*.js",
    "./src/components/resolutions/*.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
