const User = require("../models/User");

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

 exports.followuser =    async (req, res) => {
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
  }