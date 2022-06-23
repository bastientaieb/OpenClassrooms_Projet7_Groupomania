<!-- Page principal -->
<script>
import headerHome from "../layouts/headerHome.vue";
import cardPost from "../commons/cardPost.vue";
import postHome from "../commons/postHome.vue";
import footerPage from "../layouts/footerPage.vue";
export default {
  name: "homePage",
  components: { headerHome, cardPost, postHome, footerPage },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/signin");
    }
  },
  /* Vérification que le token de connexion est bien enregistré, sinon redirection vers la page de connexion. */
  data() {
    return {
      posts: [],
      currentUser: null,
    };
  },
  mounted() {
    const url = "http://localhost:3000/home";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Impossible de récupérer les posts");
        }
      })
      .then((res) => {
        const { posts, email } = res;
        this.posts = posts;
        this.currentUser = email;
      })
      .catch((error) => console.log("error:", error));
  },
};
</script>

<template>
  <headerHome />
  <img
    class="mb-5 ms-2"
    src="/groupomania-logo.png"
    alt="Logo entreprise Groupomania"
  />
  <div v-if="currentUser" class="container-sm">
    <postHome />
    <div v-for="post in posts">
      <cardPost
        :currentUser="currentUser"
        :email="post.user.email"
        :content="post.content"
        :url="post.imageUrl"
        :comments="post.comments"
        :id="post.id"
      />
      <!-- Pour chaque post reçu en requête on fabrique une cardpost dynamiquement -->
    </div>
  </div>
  <footerPage />
</template>

<style scoped>
.mb-5 {
  width: 15rem;
}

body {
  background-color: rgb(237, 236, 236) !important;
}
</style>
