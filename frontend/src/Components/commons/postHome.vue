<!-- Components de publication de post avec le textarea et l'input de sélection d'image -->
<script>
export default {
  name: "postHome",
  data() {
    return {
      content: "",
      image: null,
    };
    // Relier au v-model pour enregistrer le contenu des formulaires et l'image.
  },
  methods: {
    selectionOfFiles(event) {
      this.image = event.target.files[0];
    },
    // Permet de sélectionner l'image lors du click.
    submitPost() {
      const url = "http://localhost:3000/home";
      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("image", this.image);
      // On relie le content et l'image enregistré pour les envoyer dans la requête avec un formData.
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        /* On envoi le token pour vérifier que l'utilisateur est bien en droit d'être sur la page d'accueil */
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            return res.json();
          } else {
            throw new Error("Erreur de chargement du contenu");
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
  <div id="center-textarea">
    <div class="form-floating" id="center">
      <textarea
        placeholder="Publier..."
        id="floatingTextarea"
        v-model="content"
      ></textarea>
      <!-- Relié au data() -->
    </div>
    <div
      class="input-image mb-3 d-flex justify-content-start align-items-center"
    >
      <button @click="submitPost" class="btn btn-primary" type="submit">
        <!-- Appel de la requête au click.  -->
        Publier
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
</template>

<style scoped>
#center-textarea {
  width: 50%;
  margin: auto;
}

textarea {
  resize: vertical;
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
