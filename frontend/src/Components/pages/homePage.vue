<script>
import headerHome from "../layouts/headerHome.vue";
import cardPost from "../commons/cardPost.vue";
import postHome from "../commons/postHome.vue";
import footerPage from "../layouts/footerPage.vue";
export default {
  name: "homePage",
  components: { headerHome, cardPost, postHome, footerPage },
};
</script>

<template>
  <headerHome />
  <img
    class="mb-5 ms-2"
    src="/groupomania-logo.png"
    alt="Logo entreprise Groupomania"
  />
  <div class="container-sm">
    <postHome />
    <cardPost />
    <cardPost />
    <cardPost />
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
