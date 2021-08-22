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

module.exports = ajv.compile(schema);
