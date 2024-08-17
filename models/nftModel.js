const mongoose = require("mongoose");

const nftShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "NFT must have name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
    required: [true, "A NFT must have price"],
  },

  price: {
    type: Number,
    required: true,
  },
});

const NFT = mongoose.model("NFT", nftShema);

module.exports = NFT;
