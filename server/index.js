const app = require("./src/app");
const config = require("./config");

const { port: PORT, host: HOST } = config.app;

app.listen(PORT, HOST, () => {
  global.console.log(`Server has been started on host: ${HOST}, port: ${PORT}`);
});
