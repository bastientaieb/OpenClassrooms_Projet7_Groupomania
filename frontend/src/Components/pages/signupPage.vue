<!-- Page d'inscription -->
<script>
import headerSignup from "../layouts/headerSignup.vue";
import footerPage from "../layouts/footerPage.vue";
import axios from "axios";
export default {
  name: "signupPage",
  components: { headerSignup, footerPage },
  data() {
    return {
      username: "bastien_taieb70@yahoo.fr",
      password: "bastien",
      confirmPassword: "bastien",
      invalidConnection: false,
    };
  },
  watch: {
    /* Booléen qui regarde si la connexion est valide (!bool = true => Connexion invalide)  */
    username(value) {
      const isValueEmpty = value === "";
      this.formatSignupValid(!isValueEmpty);
    },
    password(value) {
      const isValueEmpty = value === "";
      this.formatSignupValid(!isValueEmpty);
    },
  },
  methods: {
    formatSignupValid,
    createUser,
  },
};
function formatSignupValid(bool) {
  this.invalidConnection = !bool;
}

async function createUser(email, password, confirmPassword) {
  console.log({ email, password, confirmPassword });
  const url = "http://localhost:3000/auth/signup";
  const body = JSON.stringify({
    email,
    password,
    confirmPassword,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    await axios.post(url, body, options);
    this.$router.go("/");
  } catch (error) {
    console.error("Erreur du front : " + error);
  }
}
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
          v-model="username"
          required="true"
          @invalid="formatSignupValid"
        />
        <label for="floatingInput">Adresse e-mail</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required="true"
          @invalid="formatSignupValid"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>

      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          placeholder="Confirmer le mot de passe"
          v-model="confirmPassword"
          required="true"
          @invalid="formatSignupValid"
        />
        <label for="floatingPassword">Confirmer le mot de passe</label>
      </div>

      <div v-if="invalidConnection" class="verifyEmptyInput">
        <!-- Condition pour que la span apparaisse (Méthode de vérification de format d'input qui doit être false) -->
        Tous les champs doivent être remplis
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="w-100 btn btn-warning btn-primary"
        type="submit"
        @click.prevent="
          () =>
            createUser(
              this.username,
              this.password,
              this.confirmPassword,
              this.$router
            )
        "
        :disabled="invalidConnection"
      >
        S'inscrire
      </button>
      <!-- Appel de la requête d'inscription -->
      <!-- Bouton qui n'apparait pas si les champs ne sont pas remplis -->
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
