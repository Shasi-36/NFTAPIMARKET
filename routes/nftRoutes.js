const express = require("express");
const nftController = require("./../Controlers/nftControllers");

const router = express.Router();
//router.param("ID", nftController.checkId);
// NFT ROUTER
router.route("/").get(nftController.getAllNfts).post(nftController.createNft);
// .post(nftController.checkBody, nftController.createNft);
router
  .route("/:id")
  .get(nftController.getSingleNft)
  .patch(nftController.updateNft)
  .delete(nftController.deleteNft);

module.exports = router;
