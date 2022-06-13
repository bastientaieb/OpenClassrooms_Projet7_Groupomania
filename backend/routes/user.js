/* Import des controllers */
const logUser = require("../controllers/user");

/* Import express & configuration du router */
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/signin", logUser);
/* userRoutes.post("/signup", createUser); */

module.exports = userRoutes;
