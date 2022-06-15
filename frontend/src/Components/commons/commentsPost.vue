<script>
import avatarProfile from "./avatarProfile.vue";
export default {
  name: "commentsPost",
  components: { avatarProfile },
};
</script>

<template>
  <div class="d-flex gap-1">
    <avatarProfile />
    <div class="d-flex flex-column comments p-1">
      <p>Mathieu du Marketing</p>
      <p>Salut, belle photo</p>
    </div>
  </div>
</template>

<style scoped>
.comments {
  background-color: var(--bs-gray-300);
  border-radius: 5px;
  width: 100%;
}

.d-flex p {
  margin-bottom: 0;
}
.card-body > .d-flex {
  margin-bottom: 1rem;
}

.d-flex p:nth-child(1) {
  font-weight: 500;
}
</style>
