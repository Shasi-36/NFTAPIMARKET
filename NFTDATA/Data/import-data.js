const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const NFT = require("../../models/nftModel");
const { log } = require("console");

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

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft_sample.json`, "utf-8")
);

// IMPORT DATA

const importData = async () => {
  try {
    NFT.create(nfts);
    console.log("Data Successfully Loaded");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// DELETE DATA

const deleteData = async () => {
  try {
    NFT.deleteMany();
    console.log("Data Successfully Deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--importData") {
  importData();
} else if (process.argv[2] === "--deleteData") {
  deleteData();
}
