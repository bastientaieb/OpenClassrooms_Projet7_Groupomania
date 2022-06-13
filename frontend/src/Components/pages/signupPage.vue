<script>
import headerSignup from "../layouts/headerSignup.vue";
import footerPage from "../layouts/footerPage.vue";
export default {
  name: "signupPage",
  components: { headerSignup, footerPage },
};
</script>

<template>
  <headerSignup />
  <main class="form-signup w-100 m-auto">
    <form>
      <img
        class="mb-4"
        src="/groupomania-logo.png"
        alt="Logo entreprise Groupomania"
        width="auto"
        height="57"
      />

      <h1 class="h3 mb-3 fw-normal">Inscrivez-vous</h1>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Adresse e-mail</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-warning btn-primary" type="submit">
        S'inscrire
      </button>
    </form>
  </main>
  <footerPage />
</template>

<style scoped>
html,
body {
  height: 100%;
  padding-bottom: 0px;
}

body {
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signup {
  max-width: 330px;
  padding: 15px;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signup input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
