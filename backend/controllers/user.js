const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function logUser(req, res) {
  console.log("Requête ok");
  res.send("Connexion réussi");
}

module.exports = logUser;
