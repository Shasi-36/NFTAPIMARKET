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

exports.aliasTopNfts = (req, res, next) => {
  (req.query.limit = "5"), (req.query.sort = "-ratingsAverage,price");
  req.query.fields = "name,price,ratingsAvarage,difficulty";
};
exports.getAllNfts = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj);
    // ADVANCE FITERING QUERYY

    const querStr = JSON.stringify(queryObj);
    querStr = querStr.replace(/\b(gte|gt|lte|t)\b/g, (match) => `$${match}`);
    const query = await NFT.find(JSON.parse(querStr));

    // SORTING METHOD

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // FIELDS LIMITING

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__V");
    }

    // PAGINATION FUNCTION

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = req.query.skip(page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const newNfts = await NFT.countDocuments();
      if (skip >= newNfts) throw new Error("this page is doesn't exist");
    }
    const nfts = await query;

    // const nfts = await NFT.find({
    //   difficulty: "easy",
    // });

    //const nfts = await NFT.find().where("difficulty").equals("easy");
    // SEND QUERY
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
