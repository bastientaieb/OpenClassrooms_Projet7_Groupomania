<script>
import headerHome from "../layouts/headerHome.vue";
import footerPage from "../layouts/footerPage.vue";
export default {
  name: "modifyPost",
  components: { headerHome, footerPage },
  props: ["id"],
  data() {
    return {
      contentModified: "",
      imageModified: null,
    };
  },

  mounted() {},
  methods: {
    selectionOfFiles(event) {
      this.imageModified = event.target.files[0];
    },
    modifyPost() {
      /* C'est ici que je n'arrive pas à récupérer l'ID dans la props */
      /* Même en mettant l'id dans les props ca ne fonctionne pas car le props ID lié à chaque poste créé dynamiquement n'apparait pas. */
      const id = this.$props.id;
      const url = "http://localhost:3000/home/" + id;
      console.log("props: ", id);
      const formData = new FormData();
      formData.append("content", this.contentModified);
      formData.append("image", this.imageModified);
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Erreur de modification du post");
          }
        })
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
            v-model="contentModified"
            :id="post.id"
          ></textarea>
          <!-- Relié au data() -->
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
