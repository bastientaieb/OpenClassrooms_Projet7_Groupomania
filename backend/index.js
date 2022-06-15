/* Imports packages */
// Rend les données chiffrées disponibles globalement
require("dotenv").config();
const express = require("express");
const cors = require("cors");

/* Import des routes secondaires */
const { userRoutes } = require("./routes/user.js");

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
app.use("/auth", userRoutes);

/* Configuration du port */
app.listen(port, () => console.log("port:", port));
