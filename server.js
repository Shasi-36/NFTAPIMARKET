const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
//console.log(process.env);
if (process.env.NODE_ENV === "Developemnt") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app running at port ${PORT}....`);
});
