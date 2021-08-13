const ajv = require("./ajv");

const schema = {
  type: "object",
  properties: {
    key: { type: "string" },
    resolution: { type: "string" },
  },
  additionalProperties: false,
  oneOf: [{ required: ["key"] }, { required: ["resolution"] }],
};

module.exports = ajv.compile(schema);
