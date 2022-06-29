<script>
import signinPage from "./Components/pages/signinPage.vue";
export default {
  name: "App",
  components: { signinPage },
};
</script>

<template>
  <!-- Components Signin via le router view  -->
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap");

:root {
  --redCG: #fd2d01;
  --pinkCG: #ffd7df;
  --greyCG: #4e5166;
}

body {
  font-family: Lato, sans-serif !important;
}
</style>
