const express = require("express");
const userController = require("./../Controlers/userController");

const router = express.Router();

// USER ROUTER
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
