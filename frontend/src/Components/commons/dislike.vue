<!-- <script>
import axios from "axios";
export default {
  name: "dislikePost",
  props: ["post"],
  data() {
    return {
      totalDislike: "",
    };
  },
  methods: {
    disLikePost() {
      axios
        .post("/dislike/" + this.post, { post: this.post })
        .then((res) => {
          this.getDislike();
          $("#success").html(res.data.message);
        })
        .catch();
    },
    getDislike() {
      axios.post("/dislike", { post: this.post }).then((res) => {
        console.log(response.data.post.dislike);
        this.totalDislike = res.data.post.dislike;
      });
    },
  },
  mounted() {
    this.getDislike();
  },
};
</script>

<template>
  <p id="success"></p>
  <a id="linkDislike"
    ><i
      @click.prevent="disLikePost"
      class="bi bi-hand-thumbs-down-fill"
      aria-hidden="true"
    ></i
    >({{ totalDislike }})</a
  >
</template>

<style scoped>
.bi-hand-thumbs-down-fill {
  font-size: 1.4rem;
}

#linkDislike:hover {
  transform: scale(1.2);
  color: red;
  cursor: pointer;
}
</style>
 -->