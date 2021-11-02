const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const userContoller = require("../controllers/userContoller");

// update a  user

router.route('/:id').put(userContoller.updateuser)

// deleting a user

router.delete("/:id", async (req, res) => {
  if (req.body.userid === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }

    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("you can only update your account");
  }
});

// get a user
router.route("/:id").get(userContoller.getAllUsers);

// follow a user
router.route("/:id/follow").put(userContoller.followuser);

// unfollow a user
router.route("/:id/unfollow").put(userContoller.unfollowuser);

module.exports = router;
