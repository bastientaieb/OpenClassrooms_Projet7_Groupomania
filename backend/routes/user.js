/* Import des controllers */
const { logUser, createUser } = require("../controllers/user.js");


/* Import express & configuration du router */
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/signin", logUser);
userRoutes.post("/signup", createUser);

module.exports = { userRoutes };
