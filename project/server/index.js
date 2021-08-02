import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  global.console.log(`Server has been started on port: ${PORT}`);
});
