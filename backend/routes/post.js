const express = require("express");
const postRoutes = express.Router();

const { verifyUser } = require("../middlewares/auth.js");

module.exports = { postRoutes };
