const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const userContoller = require("../controllers/userContoller")

// update a  user

router.put("/:id", async (req, res) => {
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
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("you can only update your account");
  }
});

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

router.route('/:id').get(userContoller.getAllUsers)

// follow a user
router.route('/:id/follow').put(userContoller.followuser)


// unfollow a user 
   
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
  
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followin: req.params.id } });
          res.status(202).json("you unfollowed this user");
        } else {
          res.status(403).json("you are not  following this user ");
        }
      } catch (error) {}
    } else {
      res.status(200).json("you cannot follow yourself");  
    }
  });
  
  




module.exports = router;
