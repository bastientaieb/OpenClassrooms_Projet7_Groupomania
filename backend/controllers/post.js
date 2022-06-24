const { prisma } = require("../bdd/bdd.js");

/* Fonctions principales */

async function getPosts(req, res) {
  const email = req.email;
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send({ posts, email });
}
// Fonction pour récupérer tous les posts sur la page Home.
// Utilisation de la méthode prisma findMany pour récupérer tous les posts avec l'email utilisateur de tous les comments & l'email utilisateur de tous les posts.

async function createPosts(req, res) {
  const content = req.body.content;
  const email = req.email;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const userId = user.id;
    const post = { content, userId };
    console.log("post :", post);
    addImage(req, post);

    const newPost = await prisma.post.create({ data: post });
    console.log("newPost :", newPost);
    res.send({ post: newPost });
  } catch (error) {
    res.status(500).send({ error: "Erreur de création de post" });
  }
}

async function createComments(req, res) {
  const postId = Number(req.params.id);
  try {
    const post = await findUniquePost(postId);
    if (post == null) {
      return res.status(404).send({ error: "Post introuvable" });
    }
    const userComment = await prisma.user.findUnique({
      where: { email: req.email },
    });
    const userId = userComment.id;
    const newComment = { userId, postId, content: req.body.comment };
    const comment = await prisma.comment.create({ data: newComment });
    res.send({ comment });
  } catch (error) {
    res.status(500).send({ error: "Erreur de création du commentaire" });
  }
}
// On renvoie le post en entier car les comments font partis de l'objet post.

async function deletePosts(req, res) {
  const postId = Number(req.params.id);
  try {
    const post = await findUniquePostUser(postId);
    if (post == null) {
      return res.status(404).send({ error: "Post introuvable" });
    }
    const email = req.email;
    // Récupéré dans le token
    /* Vérification de l'identité de la personne qui supprime le post */
    if (email !== post.user.email) {
      return res
        .status(403)
        .send({ error: "Vous n'êtes pas l'auteur de ce post" });
    }
    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });
    res.send({ message: "Post supprimé" });
  } catch (error) {
    res.status(500).send({ error: "Erreur de suppression du post :", error });
  }
}

function modifyPost(req, res) {
  console.log("le backend répond");
}

function displayLikes() {
  console.log("Je vais mettre des likes");
}

/* Fonctions auxiliaires */

function addImage(req, post) {
  const postWithImage = req.file != null;
  if (!postWithImage) return;
  const urlOfImage = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  post.imageUrl = urlOfImage;
}
// Créer l'URL de l'image géré par le Multer

function findUniquePost(postId) {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
}
// Méthode findUnique de prisma pour trouver le post qui reçoit un nouveau commentaire.

function findUniquePostUser(postId) {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
}

module.exports = {
  getPosts,
  createPosts,
  createComments,
  deletePosts,
  displayLikes,
  modifyPost,
};
