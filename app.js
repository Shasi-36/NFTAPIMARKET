// const { log } = require("console");
// const express = require("express");
// const fs = require("fs");

// const app = express();
// app.use(express.json());
// // app.get("/", (req, res) => {
// //   res.status(200).json({ message: "this is market api", api: "marketapi" });
// // });

// // app.post("/post", (req, res) => {
// //   res.status(201).json({ message: "yourdata" });
// // });

// const nfts = JSON.parse(
//   fs.readFileSync(`${__dirname}/NFTDATA/Data/nft_sample.json`)
// );

// // GET REQUEST
// app.get("/api/v1/nfts", (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     result: nfts.length,
//     data: {
//       nfts: nfts[2],
//     },
//   });
// });

// // POST REQUEST

// app.post("/api/v1/nfts", (req, res) => {
//   const newId = nfts.length - 1 + 1;
//   console.log(newId);
//   const newNFTs = Object.assign({ id: newId }, req.body);
//   nfts.push(newNFTs);
//   // console.log(nfts);

//   fs.writeFile(
//     `${__dirname}/NFTDATA/Data/nft_sample.json`,
//     JSON.stringify(nfts),
//     (err) => {
//       res.status(201).json({
//         status: "Ok",
//         result: nfts.length,
//         nft: newNFTs,
//       });
//     }
//   );
// });

// // Single data

// app.get("/api/v1/nfts/:id", (req, res) => {
//   const id = req.params.id * 1;

//   const nft = nfts.find((ele) => ele.id === id);
//   if (!nft) {
//     return res.status(404).json({
//       status: "fail",
//       mmessage: "invaid Id",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       nft,
//     },
//   });
// });

// // PATCH DATA

// app.patch("/api/v1/nfts/:id", (req, res) => {
//   const id = req.params.id * 1;
//   if (id > nfts.length) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Not Found",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     message: "update data",
//   });
// });

// app.delete("/api/v1/nfts/:id", (req, res) => {
//   const id = req.params.id * 1;
//   if (id > nfts.length) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Not Found",
//     });
//   }
//   res.status(204).json({
//     status: "success",
//     message: "deleted",
//   });
// });

// // console.log(nfts);
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`app running at port ${PORT}....`);
// });

///***************************** PART-2 ****************** */

const { log } = require("console");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  console.log("i am from middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/NFTDATA/Data/nft_sample.json`)
);

// GET REQUEST
const getAllNfts = (req, res) => {
  res.status(200).json({
    status: "Success",
    Time: req.requestTime,
    result: nfts.length,
    data: {
      nfts,
    },
  });
};

// POST REQUEST
const createNft = (req, res) => {
  const newId = nfts.length - 1 + 1;
  console.log(newId);
  const newNFTs = Object.assign({ id: newId }, req.body);
  nfts.push(newNFTs);

  fs.writeFile(
    `${__dirname}/NFTDATA/Data/nft_sample.json`,
    JSON.stringify(nfts),
    (err) => {
      res.status(201).json({
        status: "Ok",
        result: nfts.length,
        nft: newNFTs,
      });
    }
  );
};

// Single data
const getSingleNft = (req, res) => {
  const id = req.params.id * 1;

  const nft = nfts.find((ele) => ele.id === id);
  if (!nft) {
    return res.status(404).json({
      status: "fail",
      mmessage: "invaid Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      nft,
    },
  });
};

// PATCH DATA
const updateNft = (req, res) => {
  const id = req.params.id * 1;
  if (id > nfts.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "update data",
  });
};

// DELETE NFT
const deleteNft = (req, res) => {
  const id = req.params.id * 1;
  if (id > nfts.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Not Found",
    });
  }
  res.status(204).json({
    status: "success",
    message: "deleted",
  });
};

// app.get("/api/v1/nfts", getAllNfts);
// app.post("/api/v1/nfts", createNft);
// app.get("/api/v1/nfts/:id", getSingleNft);
// app.patch("/api/v1/nfts/:id", updateNft);
// app.delete("/api/v1/nfts/:id", deleteNft);

app.route("/api/v1/nfts").get(getAllNfts).post(createNft);
app
  .route("/api/v1/nfts/:id")
  .get(getSingleNft)
  .patch(updateNft)
  .delete(deleteNft);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app running at port ${PORT}....`);
});
