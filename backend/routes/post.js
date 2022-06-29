const express = require("express");
/* Import des controllers */
const {
  getPosts,
  createPosts,
  createComments,
  deletePosts,
  displayLikes,
  modifyPost,
  deleteLike,
} = require("../controllers/post.js");

/* Import des middlewares */
const multer = require("../middlewares/multer.js");
const { verifyUser } = require("../middlewares/auth.js");

/* Création du router pour les posts */
const postRoutes = express.Router();

postRoutes.post("/", verifyUser, multer, createPosts);
postRoutes.post("/modify/:id", multer, modifyPost);
postRoutes.post("/:id/like", displayLikes);
postRoutes.post("/:id", createComments);
postRoutes.delete("/:id", deletePosts);
postRoutes.delete("/:id/like", deleteLike);
postRoutes.get("/", verifyUser, getPosts);

module.exports = { postRoutes };
