const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  global.console.log(`Server has been started on port: ${PORT}`);
});
