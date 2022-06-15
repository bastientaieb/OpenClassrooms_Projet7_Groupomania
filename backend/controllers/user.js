const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users } = require("../bdd/bdd.js");

function logUser(req, res) {
  const { email, password } = req.body;
  const user = getUser(email);
  if (user === null)
    return res.status(404).send({ message: "Utilisateur introuvable" });
  bcrypt
    .compare(req.body.password, user.password)
    .then((valid) => {
      if (!valid) {
        return res.status(401).send("Mot de passe incorrect");
      }
      const tokenUser = createToken(email);
      res.status(200).send({ email: user.email, token: tokenUser });
    })
    .catch((error) => res.status(500).send({ error }));
}

function getUser(email) {
  return users.find((user) => user.email === email);
}

function verifyPassword(user, password) {
  return user.password === password;
}

function createToken(email) {
  return jsonwebtoken.sign({ email }, process.env.JWT_PASSWORD, {
    expiresIn: "24h",
  });
}

function createUser(req, res) {
  const { email, password } = req.body;
  const confirmPassword = req.body.confirmPassword;
  let newUser = getUser(email);
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      newUser = {
        email: req.body.email,
        password: hashedPassword,
      };
      newUser
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}

function hashPassword(password) {
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const newUser = {
        email: req.body.email,
        password: hashedPassword,
      };
      newUser
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}

module.exports = { logUser, createUser };
