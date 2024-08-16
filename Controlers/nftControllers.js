const { log } = require("console");
const express = require("express");
const fs = require("fs");
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/../NFTDATA/Data/nft_sample.json`)
);

exports.checkId = (req, res, next, value) => {
  console.log(`id: ${value}`);

  const id = req.params.id * 1;
  if (id > nfts.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Not Found",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.occupation) {
    res.status(400).json({
      status: "Fail",
      message: "Data missing",
    });
  }
  next();
};
// GET REQUEST
exports.getAllNfts = (req, res) => {
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
exports.createNft = (req, res) => {
  const newId = nfts.length - 1 + 1;
  console.log(newId);
  const newNFTs = Object.assign({ id: newId }, req.body);
  nfts.push(newNFTs);

  fs.writeFile(
    `${__dirname}/../NFTDATA/Data/nft_sample.json`,
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
exports.getSingleNft = (req, res) => {
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
exports.updateNft = (req, res) => {
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
exports.deleteNft = (req, res) => {
  res.status(204).json({
    status: "success",
    message: "deleted",
  });
};
