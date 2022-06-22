const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("../bdd/bdd.js");

/* function logUser(req, res) {
  const { email, password } = req.body;

  /* Récupération de l'utilisateur dans la base de données */
/* const user = findUser(email); */

/* Vérification de l'existence de l'utilisateur */
/*  if (user === null)
    return res.status(404).send({ message: "Utilisateur introuvable" });

  /* Vérification du mot de passe avec la méthode compare de Bcrypt */
/*  bcrypt
    .compare(req.body.password, user.password)
    .then((valid) => {
      if (!valid) {
        return res.status(401).send("Mot de passe incorrect");
      }
      /* Création du token de session */
/* const tokenUser = createToken(email);
      res.status(200).send({ email: user.email, token: tokenUser });
    })
    .catch((error) => res.status(500).send({ error }));
} */

async function logUser(req, res) {
  const { email, password } = req.body;
  const user = await findUser(email);

  try {
    console.log("user :", user);
    if (user == null) {
      return res.status(404).send({ error: "User not found" });
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

function passwordVerification(user, password) {
  return bcrypt.compare(password, user.password);
}

function createToken(email) {
  return jsonwebtoken.sign({ email }, process.env.JWT_PASSWORD, {
    expiresIn: "24h",
  });
}

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

function findUser(email) {
  return prisma.user.findUnique({ where: { email } });
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function saveUser(user) {
  return prisma.user.create({ data: user });
}

module.exports = { logUser, createUser };
