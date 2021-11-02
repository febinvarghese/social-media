const User = require("../models/User");

exports.deleteuser = async (req, res) => {
  if (req.body.userid === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("you can only update your account");
  }
};


// update user
exports.updateuser = async (req, res) => {
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
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, _id, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

// follow a user
exports.followuser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followin: req.params.id } });
        res.status(202).json("you are now following this user");
      } else {
        res.status(403).json("you have already followed this user");
      }
    } catch (error) {}
  } else {
    res.status(200).json("you cannot follow yourself");
  }
};

// unfollow a user
exports.unfollowuser = async (req, res) => {
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
};
