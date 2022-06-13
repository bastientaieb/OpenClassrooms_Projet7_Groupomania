<script>
export default {
  name: "postHome",
};
</script>

<template>
  <div id="center-textarea">
    <div class="form-floating" id="center">
      <textarea placeholder="Publier..." id="floatingTextarea"></textarea>
    </div>
    <div
      class="input-image mb-3 d-flex justify-content-start align-items-center"
    >
      <button class="btn btn-primary" type="submit">Publier</button>
      <input type="file" class="custom-file-input" id="inputGroupFile03" />
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
