<!-- <script>
import axios from "axios";
export default {
  name: "likePost",
  props: ["post"],
  data() {
    return {
      totallike: "",
    };
  },
  methods: {
    likePost() {
      axios
        .post("/like/" + this.post, { post: this.post })
        .then((response) => {
          this.getlike();
          $("#success").html(response.data.message);
        })
        .catch();
    },
    getlike() {
      axios.post("/like", { post: this.post }).then((response) => {
        console.log(response.data.post.like);
        this.totallike = response.data.post.like;
      });
    },
  },
  mounted() {
    this.getlike();
  },
};
</script>

<template>
  <p id="success"></p>
  <a id="linkLike"
    ><i
      @click.prevent="likePost"
      class="bi bi-hand-thumbs-up-fill"
      aria-hidden="true"
    ></i
    >({{ totallike }})</a
  >
</template>

<style scoped>
.bi-hand-thumbs-up-fill {
  font-size: 1.4rem;
}
#linkLike:hover {
  transform: scale(1.2);
  color: green;
  cursor: pointer;
}
</style>
 -->