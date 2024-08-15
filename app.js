const { log } = require("console");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "this is market api", api: "marketapi" });
// });

// app.post("/post", (req, res) => {
//   res.status(201).json({ message: "yourdata" });
// });

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/NFTDATA/Data/nft_sample.json`)
);

// GET REQUEST
app.get("/api/v1/nfts", (req, res) => {
  res.status(200).json({
    status: "Success",
    result: nfts.length,
    data: {
      nfts: nfts[2],
    },
  });
});

// POST REQUEST

app.post("/api/v1/nfts", (req, res) => {
  const newId = nfts[nfts.length - 1] + 1;
  const newNFTs = Object.assign({ id: newId }, req.body);
  nfts.push(newNFTs);

  fs.watchFile(
    `${__dirname}/NFTDATA/Data/nft_sample.json`,
    JSON.stringify(nfts),
    (err) => {
      res.status(201).json({
        status: "Ok",
        result: nfts.length,
        data: {
          nft: newNFTs,
        },
      });
    }
  );
});

// console.log(nfts);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app running at port ${PORT}....`);
});
