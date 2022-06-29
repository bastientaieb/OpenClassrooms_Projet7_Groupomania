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
postRoutes.post("/modify/:id", verifyUser, multer, modifyPost);
postRoutes.post("/:id/like", verifyUser, displayLikes);
postRoutes.post("/:id", verifyUser, createComments);
postRoutes.delete("/:id", verifyUser, deletePosts);
postRoutes.delete("/:id/like", verifyUser, deleteLike);
postRoutes.get("/", verifyUser, getPosts);

module.exports = { postRoutes };
