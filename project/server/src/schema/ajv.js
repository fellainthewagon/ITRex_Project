const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });

// все делаю по доке, но вылетает ошибка при добалвении форматов
addFormats(ajv);

module.exports = ajv;
