const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER  the user

router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    //  create new password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedPassword,
    });

    //  save new user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({  email: req.body.email});
    // console.log(user.username);
    !user && res.status(404).json("user not found");
        
    const validName = await user.username === req.body.username;
    !validName && res.status(404).json("please enter a valid name")

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    !validPassword && res.status(404).json("wrong password")

    res.status(200).json(user)
  } catch (error) {
      res.status(500).json("error")
  }
});

module.exports = router;
