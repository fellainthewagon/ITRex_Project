const ajv = require("./ajv");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    resolution: { type: "string" },
  },
  additionalProperties: false,
  oneOf: [
    { required: ["name"] },
    { required: ["id"] },
    { required: ["resolution"] },
  ],
};
module.exports.validator = ajv.compile(schema);

const addPatientToQueueSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
  required: ["id", "name"],
  additionalProperties: false,
};
module.exports.addPatientToQueueValidator = ajv.compile(
  addPatientToQueueSchema
);

const registerSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};
module.exports.registerValidator = ajv.compile(registerSchema);

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
module.exports.loginValidator = ajv.compile(loginSchema);
