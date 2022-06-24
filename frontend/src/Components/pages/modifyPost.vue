<!-- Page de modification des posts -->
<script>
import headerHome from "../layouts/headerHome.vue";
import footerPage from "../layouts/footerPage.vue";
export default {
  name: "modify",
  components: { headerHome, footerPage },
  props: ["id", ],
  data() {
    return {
      content: "",
      image: null,
    };
  },

  mounted() {},
  methods: {
    selectionOfFiles(event) {
      this.image = event.target.files[0];
    },
    modifyPost() {
      const id = this.id;
      console.log(id);
      const url = "http://localhost:3000/home/modify/" + id;
      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("image", this.image);
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        /* .then(() => {
          this.$router.go("home/");
        }) */
        .catch((error) => console.error("Erreur front: ", error));
    },
  },
};
</script>

<template>
  <headerHome />
  <div class="d-flex">
    <img
      class="mb-4"
      src="/groupomania-logo.png"
      alt="Logo entreprise Groupomania"
    />
  </div>

  <div class="card mb-3">
    <div class="card-header">
      <div id="center-textarea">
        <div class="form-floating" id="center">
          <textarea
            placeholder="Publier..."
            id="floatingTextarea"
            v-model="content"
            :id="post.id"
          ></textarea>
        </div>
        <div
          class="input-image mb-3 d-flex justify-content-start align-items-center"
        >
          <button @click="modifyPost" class="btn btn-primary" type="submit">
            Modifier
          </button>
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile03"
            @change="selectionOfFiles"
          />
        </div>
      </div>
      <hr class="dropdown-divider mt-5" />
    </div>
  </div>
  <footerPage />
</template>

<style scoped>
img {
  margin: auto;
  width: 30rem;
  height: auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1 rem;
  width: 100%;
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

#center-textarea {
  width: 100%;
  margin: auto;
}

textarea {
  resize: vertical;
  width: 100%;
  height: 8rem;
}
#floatingTextarea[data-v-6fb64cd6] {
  width: 100%;
  height: 6rem;
  border: 0.5px solid black;
}
.btn-primary {
  margin-top: 1rem;
}
input[type="file"] {
  color: transparent;
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
