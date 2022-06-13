<script>
import headerSignin from "../layouts/headerSignin.vue";
import footerPage from "../layouts/footerPage.vue";

export default {
  name: "signinPage",
  components: { headerSignin, footerPage },
  data() {
    return {
      username: "bastien@taieb.com",
      password: "taieb",
      invalidConnection: false,
    };
  },
  methods: {
    checkUsers(email, password) {
      const token = "token";
      if (email === !this.email) {
        throw new Error("Invalid Email");
      }
      if (password === !this.password) {
        throw new Error("Invalid Password");
      }
      localStorage.setItem("token:", token);
    },
    /* Méthode qui va récupérer login et mdp, vérifier si il est correct et ajouter le token dans le localStorage */
    formatSigninValid(bool) {
      this.invalidConnection = !bool;
    },
    /* Booléen qui regarde si la connexion est valide (!bool = true => Connexion invalide)  */
  },
  watch: {
    username(value) {
      const isValueEmpty = value === "";
      this.formatSigninValid(!isValueEmpty);
    },
    password(value) {
      const isValueEmpty = value === "";
      this.formatSigninValid(!isValueEmpty);
    },
  },
  /* Méthode qui défini si le format de connexion est valide en vérifiant si les champs sont vides */
};
</script>

<template>
  <headerSignin />
  <main class="form-signin w-100 m-auto">
    <form :class="this.invalidConnection ? 'hasErrors' : ''">
      <!-- Validation de formulaire avec classe dynamique (Section Watch)-->
      <img
        class="mb-4"
        src="/groupomania-logo.png"
        alt="Logo entreprise Groupomania"
        width="auto"
        height="57"
      />
      <h1 class="h3 mb-3 fw-normal">Connectez-vous</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="username"
          required
          @invalid="formatSigninValid"
        />
        <!-- Appelle de la méthode de vérification de format de connexion -->
        <label for="floatingInput">Adresse e-mail</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required
          @invalid="formatSigninValid"
        />
        <!-- Appelle de la méthode de vérification de format de connexion -->
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <span v-if="invalidConnection" class="verifyEmptyInput">
        <!-- Condition pour que la span apparaisse (Méthode de vérification de format d'input qui doit être false) -->
        Tous les champs doivent être remplis</span
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="w-100 btn btn-warning btn-primary"
        type="submit"
        @click.prevent="() => checkUsers(this.username, this.password)"
        :disabled="invalidConnection"
      >
        <!-- @click pour faire un addEventListener -->
        Se connecter
      </button>
      <!-- <p class="mt-5 mb-3 text-muted">Value: {{ username }}</p>
      <p class="mt-5 mb-3 text-muted">Password: {{ password }}</p> -->
    </form>
  </main>
  <footerPage />
</template>

<style scoped>
.verifyEmptyInput {
  color: red;
}
.hasErrors input {
  border: 1.5px solid red;
}

html,
body {
  height: 100%;
  padding-bottom: 0px;
}

body {
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
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
