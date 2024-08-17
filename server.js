const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });
//console.log(process.env);
if (process.env.NODE_ENV === "Developemnt") {
  app.use(morgan("dev"));
}

// const DB = process.env.DATABASE.replace(
//   "PASSWORD",
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connection);
    console.log("DB Connected Successfully");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app running at port ${PORT}....`);
});
