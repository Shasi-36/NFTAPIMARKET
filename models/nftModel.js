const mongoose = require("mongoose");

const nftShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "NFT must have name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: String,
    required: [true, "must provide duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "must have difficulty"],
  },

  ratingsAvarage: {
    type: Number,
    default: 4,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
  },
  discountPrice: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "must have summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, " must provide image cover"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const NFT = mongoose.model("NFT", nftShema);

module.exports = NFT;
