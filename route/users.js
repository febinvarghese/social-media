const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const userContoller = require("../controllers/userContoller");

// update a  user
router.route("/:id").put(userContoller.updateuser);

// deleting a user
router.route("/:id").delete(userContoller.deleteuser);

// get a user
router.route("/:id").get(userContoller.getAllUsers);

// follow a user
router.route("/:id/follow").put(userContoller.followuser);

// unfollow a user
router.route("/:id/unfollow").put(userContoller.unfollowuser);

module.exports = router;
