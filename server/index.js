const app = require("./src/app");
const config = require("./config/config");

const { port: PORT, host: HOST } = config.app;

app.listen(PORT, HOST, () => {
  global.console.log(`Server has been started on ${HOST}, port: ${PORT}`);
});
