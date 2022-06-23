<!-- Modèle d'un post -->
<script>
import commentsPost from "./commentsPost.vue";
import avatarProfile from "./avatarProfile.vue";

export default {
  name: "cardPost",
  components: { commentsPost, avatarProfile },
  props: ["email", "content", "url", "comments", "id", "currentUser"],

  // Props pour le contenu dynamique des éléments des posts ()
  data() {
    return {
      comment: null,
      totalLikes: 0,
      totalDislikes: 0,
    };
    // relié aux V-model (input)
  },
  methods: {
    /* Envoi de la requête d'ajout d'un commentaire */
    addComments() {
      const url = "http://localhost:3000/home/" + "/" + this.$props.id;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          comment: this.comment,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Erreur de chargement du contenu");
          }
        })
        .then(() => {
          this.$router.go();
        })
        // Actualise la page pour récupérer tous les comments, dont le nouveau
        .catch((Error) => console.error("Erreur:", Error));
    },
    /* Envoi de la requête de suppression du post et de ses commentaires */
    deletePost() {
      const url = "http://localhost:3000/home/" + "/" + this.$props.id;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Erreur de suppression du post");
          }
        })
        .then(() => {
          this.$router.go();
        })
        .catch((Error) => console.error("Erreur front :", Error));
    },
    likePost() {
      this.totalLikes++;
    },
    disLikePost() {
      this.totalDislikes++;
    },
  },
};
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <avatarProfile />
      <!-- Props email pour l'ajouter dynamiquement -->
      <span id="avatarProfile"> {{ email }} </span>
      <router-link
        id="bi-pen"
        to="/home/modify"
        :to="{ name: 'post', params: { postId: post.id } }"
      >
        <i v-if="currentUser === email" class="bi bi-pen-fill"></i>
      </router-link>
      <i
        v-if="currentUser === email"
        class="bi bi-trash-fill"
        @click="deletePost"
      ></i>
    </div>
    <img
      v-if="url"
      :src="url"
      class="img-fluid rounded-start"
      alt="Photo utilisateur"
    />
    <!-- Props URL pour l'ajouter dynamiquement SI il y'a une image dans le post -->
    <div class="card-body">
      <p class="card-text mb-4">{{ content }}</p>
      <!-- Props content pour l'ajouter dynamiquement -->
      <div id="likeAndDislike" class="d-flex mb-3 gap-3">
        <div class="Likeconteneur">
          <button
            id="linkLike"
            class="btn btn-outline-success mb-1"
            @click="likePost"
          >
            <i class="bi bi-hand-thumbs-up-fill" aria-hidden="true"></i>
          </button>
          <div>{{ totalLikes }} <span id="likeDislike">J'aime</span></div>
        </div>
        <div class="Likeconteneur">
          <button
            id="linkDislike"
            class="btn btn-outline-danger mb-1"
            @click="disLikePost"
          >
            <i class="bi bi-hand-thumbs-down-fill" aria-hidden="true"></i>
          </button>
          <div>
            {{ totalDislikes }} <span id="likeDislike">Je n'aime pas</span>
          </div>
        </div>
      </div>
      <!-- Pour chaque commentaire parmi les commentaires, le component commentsPost sera répliqué avec les Props ci-dessous -->
      <div v-for="comment in comments">
        <commentsPost :email="comment.user.email" :content="comment.content" />
      </div>
      <div class="d-flex">
        <avatarProfile />
        <input
          type="text"
          class="form-control me-2"
          placeholder="Votre commentaire..."
          aria-label="Commentaire"
          v-model="comment"
        />
        <button
          class="btn btn-primary ms-auto"
          type="submit"
          @click="addComments"
        >
          Publier
        </button>
      </div>
    </div>
  </div>
  <hr class="dropdown-divider mt-5" />
</template>

<style scoped>
#likeDislike {
  font-size: 0.9rem;
}
.Likeconteneur {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#linkLike {
  border-radius: 50%;
  border: none;
}
#linkDislike {
  border-radius: 50%;
  border: none;
}
.bi-hand-thumbs-down-fill {
  font-size: 1.4rem;
}

#linkDislike:hover {
  transform: scale(1.02);
  color: white;
  cursor: pointer;
}
.bi-hand-thumbs-up-fill {
  font-size: 1.4rem;
}
#linkLike:hover {
  transform: scale(1.02);
  color: white;
  cursor: pointer;
}

#avatarProfile {
  margin-right: auto;
}
.bi-pen-fill {
  font-size: 1.4rem;
  color: rgb(41, 19, 183);
  margin-right: 0.6rem;
}

#bi-pen:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1 rem;
}

.bi-trash-fill {
  font-size: 1.4rem;
  color: rgb(193, 57, 57);
}
.bi-trash-fill:hover {
  cursor: pointer;
  transform: scale(1.2);
}

#profil-picture {
  margin-right: 1rem;
}
@media (min-width: 768px) {
  .card {
    width: 70%;
  }
}
.card {
  margin: auto;
  width: 50%;
}
.card img {
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
}
</style>
