const express = require("express");
const {
  getPosts,
  createPosts,
  createComments,
  deletePosts,
  displayLikes,
  modifyPost,
} = require("../controllers/post.js");

/* Import des middlewares */
const multer = require("../middlewares/multer.js");

const { verifyUser } = require("../middlewares/auth.js");

const postRoutes = express.Router();

postRoutes.post("/", verifyUser, multer, createPosts);
postRoutes.post("/:id", verifyUser, modifyPost);
postRoutes.post("/:id/like", verifyUser, displayLikes);
postRoutes.post("/:id", verifyUser, createComments);
postRoutes.delete("/:id", verifyUser, deletePosts);
postRoutes.get("/", verifyUser, getPosts);

module.exports = { postRoutes };
