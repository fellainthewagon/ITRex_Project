module.exports = {
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
