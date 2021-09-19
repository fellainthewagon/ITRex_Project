const ajv = require("./ajv");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  additionalProperties: false,
  oneOf: [{ required: ["name"] }, { required: ["id"] }],
};
module.exports.validator = ajv.compile(schema);

const addResolutionSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    resolution: { type: "string" },
  },
  additionalProperties: false,
  oneOf: [{ required: ["id"] }, { required: ["resolution"] }],
};
module.exports.addResolutionValidator = ajv.compile(addResolutionSchema);

const addPatientToQueueSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string", minLength: 2 },
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
    name: { type: "string", minLength: 2 },
    dob: { type: "string", format: "date" },
    gender: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};
module.exports.registerValidator = ajv.compile(registerSchema);

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
module.exports.loginValidator = ajv.compile(loginSchema);
