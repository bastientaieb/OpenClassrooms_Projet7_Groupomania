<script>
import commentsPost from "./commentsPost.vue";
import avatarProfile from "./avatarProfile.vue";
export default {
  name: "cardPost",
  components: { commentsPost, avatarProfile },
};
</script>
<template>
  <div class="card mb-3">
    <div class="card-header">
      <avatarProfile />
      Bastien Taieb
    </div>
    <img
      src="https://picsum.photos/200/300"
      class="img-fluid rounded-start"
      alt="Photos au hasard test"
    />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
      <commentsPost />
      <commentsPost />

      <div class="d-flex">
        <avatarProfile />
        <input
          type="text"
          class="form-control me-2"
          placeholder="Votre commentaire..."
          aria-label="Commentaire"
        />
        <button class="btn btn-primary ms-auto" type="submit">Publier</button>
      </div>
    </div>
  </div>
  <hr class="dropdown-divider mt-5" />
</template>

<style scoped>
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
