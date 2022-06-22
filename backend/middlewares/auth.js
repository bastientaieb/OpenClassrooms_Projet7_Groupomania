const jsonwebtoken = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token == null)
    return res.status(401).send({ error: "Token introuvable" });

  jsonwebtoken.verify(token, process.env.JWT_PASSWORD, (error, decoded) => {
    if (error) return res.status(401).send({ error: "Token invalide" });
    req.email = decoded.email;
    next();
  });
}
// Fonction de vérification du token de session.
// 1 -> Vérifie que le header n'est pas null.
// 2 -> Vérifie l'authenticité du token.
// 3 -> Donne l'email décodé pour que l'on puisse le récupérer dans les "req"

module.exports = { verifyUser };
