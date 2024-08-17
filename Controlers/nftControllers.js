const express = require("express");
const mongoose = require("mongoose");
const NFT = require("./../models/nftModel");
// const fs = require("fs");
// const nfts = JSON.parse(
//   fs.readFileSync(`${__dirname}/../NFTDATA/Data/nft_sample.json`)
// );

//  exports.checkId = (req, res, next, value) => {
//   console.log(`id: ${value}`);

//   const id = req.params.id * 1;
//   // if (id > nfts.length) {
//   //   return res.status(404).json({
//   //     status: "Fail",
//   //     message: "Not Found",
//   //   });
//   // }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.occupation) {
//     res.status(400).json({
//       status: "Fail",
//       message: "Data missing",
//     });
//   }
//   next();
// };
// GET REQUEST
exports.getAllNfts = async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.status(200).json({
      status: "Success",
      result: nfts.length,
      data: {
        nfts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "server error",
    });
  }
};

// POST REQUEST
exports.createNft = async (req, res) => {
  try {
    const newNFT = await NFT.create(req.body);
    res.status(201).json({
      status: "success",
      message: "nft created successfuly",
      data: {
        nft: newNFT,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "not found",
    });
  }

  // const newId = nfts.length - 1 + 1;
  // console.log(newId);
  // const newNFTs = Object.assign({ id: newId }, req.body);
  // nfts.push(newNFTs);

  // fs.writeFile(
  //   `${__dirname}/../NFTDATA/Data/nft_sample.json`,
  //   JSON.stringify(nfts),
  //   (err) => {
  //     res.status(201).json({
  //       status: "Ok",
  //       result: nfts.length,
  //       nft: newNFTs,
  //     });
  //   }
  // );
};

// Single data
exports.getSingleNft = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "get single NFT ",
      data: {
        nft: nft,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "not found",
    });
  }
};

// PATCH DATA
exports.updateNft = async (req, res) => {
  try {
    const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runvalidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Updated NFT ",
      data: {
        nft,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "not found",
    });
  }
};

// DELETE NFT
exports.deleteNft = async (req, res) => {
  try {
    await NFT.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "not found",
    });
  }
};
