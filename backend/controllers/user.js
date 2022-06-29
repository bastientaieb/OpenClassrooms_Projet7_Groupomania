const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("../bdd/bdd.js");

/* Fonctions principales */
async function logUser(req, res) {
  const { email, password } = req.body;
  const user = await findUser(email);
  /* const role = user.role; */
  try {
    if (user == null) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }

    const verifyPassword = await passwordVerification(user, password);

    if (!verifyPassword) {
      return res.status(401).send({ error: "Mot de passe incorrect" });
    }

    const token = createToken(email);
    res.send({ token: token, email: user.email });
  } catch (error) {
    res.status(500).send({ error });
  }
}
// On récupère l'utilisateur qui tente de se connecter
// On regarde si l'utilisateur existe
// Vérification que le mot de passe crypté est correct
// Si il est correct on créé le token de session qui sera placé dans le localStorage.

async function createUser(req, res) {
  const { email, password, confirmPassword } = req.body;
  try {
    if (confirmPassword == null) {
      return res
        .status(400)
        .send({ erreur: "Veuillez confirmer votre mot de passe" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ erreur: "Les deux mots de passe doivent être identiques" });
    }
    const newUser = await findUser(email);
    if (newUser != null) {
      return res.status(400).send({ erreur: "Email déjà utilisé" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await saveUser({ email, password: hashedPassword });
    console.log(user);
    res.send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
}
// On récupère le contenu qui formera les données du compte via la requête.
// On vérifie que la confirmation de mot de passe est correcte et on enregistre le nouvel utilisateur.
// On vérifie que l'e-mail n'est pas déjà pris.

/* Fonctions auxiliaires */
function passwordVerification(user, password) {
  return bcrypt.compare(password, user.password);
}
// fonction qui vérifie si le mot de passe est correct.

function createToken(email) {
  const jwtPassword = process.env.JWT_PASSWORD;
  return jsonwebtoken.sign({ email }, jwtPassword, {
    expiresIn: "24h",
  });
}
// Création du token

function findUser(email) {
  return prisma.user.findUnique({ where: { email } });
}
// Méthode pour trouver un utilisateur précis.

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
// Fonction de cryptage du mot de passe.

function saveUser(user) {
  return prisma.user.create({ data: user });
}
// Méthode de création de l'utilisateur.

module.exports = { logUser, createUser };
