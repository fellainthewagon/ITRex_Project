const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Clinic API",
      version: 1.0,
      description: "Really juicy API",
      contact: { name: "Rylkov Andrey", email: "fellainthewagon@gmail.com" },
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      {
        name: "queue",
      },
      {
        name: "resolutions",
      },
      {
        name: "auth",
      },
      {
        name: "profile",
      },
      {
        name: "doctor",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./src/app.js",
    "./src/components/queue/*.js",
    "./src/components/resolutions/*.js",
    "./src/components/auth/*.js",
    "./src/components/profile/*.js",
    "./src/components/doctor/*.js",
  ],
};

module.exports = swaggerJsDoc(swaggerOptions);
