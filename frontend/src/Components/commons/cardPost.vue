<script>
import commentsPost from "./commentsPost.vue";
import avatarProfile from "./avatarProfile.vue";
/* import likePost from "./dislike.vue";
import dislikePost from "./like.vue"; */

export default {
  name: "cardPost",
  components: { commentsPost, avatarProfile /* likePost */ /* dislikePost */ },
  props: ["email", "content", "url", "comments", "id", "currentUser"],
  data() {
    return {
      comment: null,
    };
    // relié aux V-model
  },
  mounted() {},
  methods: {
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
  },
};
</script>
<template>
  <div class="card mb-3">
    <div class="card-header">
      <avatarProfile />
      <span id="avatarProfile"> {{ email }} </span>
      <router-link id="bi-pen" to="/modify" :id="post.id">
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
    <div class="card-body">
      <p class="card-text mb-4">{{ content }}</p>
      <div id="likeAndDislike" class="d-flex mb-3 gap-3">
        <!-- <dislikePost /><likePost /> -->
      </div>
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
