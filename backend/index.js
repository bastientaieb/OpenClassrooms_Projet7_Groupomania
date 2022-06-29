/* Imports packages */
// Rend les données chiffrées disponibles globalement
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

/* Import database + */
const { prisma } = require("./bdd/bdd.js");

/* Import des routes secondaires */
const { userRoutes } = require("./routes/user.js");
const { postRoutes } = require("./routes/post.js");

/* Configuration de l'application et création du port */
const port = process.env.PORT || "3000";
const app = express();

/* Middleware */
// Rend exploitable le body des requêtes (req.body)
app.use(express.json());
// Rend exploitable les requêtes encodées. extended: true => Peut contenir tous les types de valeurs.
app.use(express.urlencoded({ extended: true }));
// Package qui autorise tous les types de requêtes
app.use(cors());

/* routes principales */
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/auth", userRoutes);
app.use("/home", postRoutes);

/* Configuration du port */
app.listen(port, () => console.log("port:", port));
