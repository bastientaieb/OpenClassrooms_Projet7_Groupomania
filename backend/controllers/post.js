const { prisma } = require("../bdd/bdd.js");

/* Fonctions principales */
async function getPosts(req, res) {
  const email = req.email;
  const userLogged = await prisma.user.findUnique({ where: { email } });
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
  res.send({ posts, email, userLogged });
}
// Fonction pour récupérer tous les posts sur la page Home.
// Utilisation de la méthode prisma findMany pour récupérer tous les posts avec l'email utilisateur de tous les comments & l'email utilisateur de tous les posts.
// Récupération de l'utilisateur connecté pour vérifier son statut (Admin ou User)

async function createPosts(req, res) {
  const content = req.body.content;
  console.log("body creation de post :", req.body);
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
// Méthode findUnique avec l'email pour trouver les détails utilisateurs et récupération du content dans la requête.
// Création du nouveau post avec l'utilisateur et le contenu.

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
// Vérification que le post existe, puis on cherche l'utilisateur pour attribuer tous les éléments du commentaire qui sera créé.
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

    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });
    res.send({ message: "Post supprimé" });
  } catch (error) {
    res.status(500).send({ error: "Erreur de suppression du post :", error });
  }
}
// Vérification que l'utilisateur est l'auteur du post puis appel des méthodes de suppression de prisma pour supprimer le post et les commentaires associés.

async function modifyPost(req, res) {
  /* Id du post modifié */
  const postId = Number(req.params.id);
  newContent = req.body.content;

  try {
    if (req.file != null) {
      const newImageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      const postModified = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          content: newContent,
          imageUrl: newImageUrl,
        },
      });
      res.send(postModified);
    } else {
      postModified = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          content: newContent,
        },
      });
      res.send(postModified);
    }
  } catch (error) {
    res.status(500).send({ error: "Erreur de modification du post :", error });
  }
}
// On regarde si la requête contient une image, si oui, on définit le nouvel imageUrl
// On appelle la méthode update avec le content et la nouvelle image via son url.
// Si il n'y a pas d'image dans la requête on update le post avec uniquement le nouveau contenu.

async function createLikes(req, res) {
  const email = req.body.email;
  console.log("email:", email);

  const postId = Number(req.params.id);
  console.log("postIdOfParams:", postId);

  const userWhoLiked = await prisma.user.findUnique({
    where: { email: email },
  });
  console.log("userWhoLiked:", userWhoLiked);

  const idOfUserWhoLiked = Number(userWhoLiked.id);
  console.log("idOfUserWhoLiked:", idOfUserWhoLiked);

  await prisma.Likes.create({
    data: {
      userId: idOfUserWhoLiked,
      postId: postId,
      email: email,
    },
  })
    .then((like) => res.json({ like }))
    .catch((error) => res.json({ message: "Erreur d'ajout du like", error }));
}
// On récupère l'utilisateur qui Like via son email
// On récupère l'Id du post liké
// Appelle de la méthode Count pour compter le nombre de likes concernés sur le postId. (On ajoute 1 car la méthode commence à 0)
// Méthode create pour ajouter le Like avec les éléments récupérés.

async function getAllLikes(req, res) {
  const postId = req.params.id;
  console.log("postId:", postId);
  const email = req.email;
  console.log("email:", email);

  await prisma.Likes.count({
    _count: {
      where: {
        postId: req.params.id,
      },
    },
  })
    .then((likes) => res.send({ likes }))
    .catch((error) => console.log("Erreur de décompte des likes", error));
}

async function deleteLike(req, res) {
  const postId = Number(req.params.id);
  console.log("postId:", postId);

  const email = req.email;
  console.log("email :", email);

  await prisma.Likes.deleteMany({
    where: { postId: postId },
  })
    .then((res) =>
      res.send({ message: "like supprimé de la base de données", res })
    )
    .catch((error) =>
      res.send({ message: "Impossible de retirer le like de ce post", error })
    );
}
// On récupère l'utilisateur qui Like via son email
// On récupère l'Id du post liké
// Appelle de la méthode Count pour compter le nombre de likes annulés concernés sur le postId. (On retire 1 car la méthode commence à 0)
// Appelle de la méthode de suppression pour retirer les likes concernant l'email utilisateur et ce post.

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
// Méthode pour trouver le post précis d'un utilisateur.

module.exports = {
  getPosts,
  createPosts,
  createComments,
  deletePosts,
  createLikes,
  modifyPost,
  deleteLike,
  getAllLikes,
};
