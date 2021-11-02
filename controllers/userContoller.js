const User = require("../models/User");




exports.getAllUsers = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, _id, ...other } = user._doc;
      res.status(200).json(other);
    } catch (error) {
      res.status(500).json(error);
    }
  }  ;