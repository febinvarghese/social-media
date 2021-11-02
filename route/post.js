const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

// delete a post
// like a post
// get a post
// get all post

// CREATE A POST

router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = newPost.save();
    res.status(202).send("saved post successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json("sucessfully updated");
    } else {
      res.status(404).json("you can only update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).send("sucesfully deleted post");
    } else {
      res.status(204).send("you an only delete your post");
    }
  } catch (error) {
    res.status(404).json("error");
  }
});

// like a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("this post has  been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("this post has been disliked ");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//  get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post)
  } catch (error) {
     res.status(404).send(error);
  }
 
});

module.exports = router;
