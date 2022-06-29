<!-- Page de connexion  -->
<script>
import headerSignin from "../layouts/headerSignin.vue";
import footerPage from "../layouts/footerPage.vue";

export default {
  name: "signinPage",
  components: { headerSignin, footerPage },
  data() {
    return {
      username: "bastien_taieb70@yahoo.fr",
      password: "bastien",
      invalidConnection: false,
    };
    /* username et password enregistré automatiquement pour se connecter */
    /* Booléen qui sert à vérifier si les identifiants sont valides */
  },
  methods: {
    signUser,
    formatSigninValid,
  },

  watch: {
    /* Booléen qui regarde si la connexion est valide (!bool = true => Connexion invalide)  */
    username(value) {
      const isValueEmpty = value === "";
      this.formatSigninValid(!isValueEmpty);
    },
    password(value) {
      const isValueEmpty = value === "";
      this.formatSigninValid(!isValueEmpty);
    },
  },
};
function formatSigninValid(bool) {
  this.invalidConnection = !bool;
}
/* Méthode qui défini si le format de connexion est valide en vérifiant si les champs sont vides */

function signUser(email, password) {
  const url = "http://localhost:3000/auth/signin";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  fetch(url, options)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((res) => {
      const token = res.token;
      localStorage.setItem("token", token);
      let tokenInCache;
      while (tokenInCache == null) {
        tokenInCache = localStorage.getItem("token");
      }
      // définition du token dans le localStorage puis récupération du token
      this.$router.push("/home");
    })
    .catch((err) => {
      console.error(err);
    });
}
/* Envoi de la requête avec l'email et le password + redirection vers la page d'accueil */
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
      <div class="verifyEmptyInput" v-if="invalidConnection">
        <!-- Condition pour que la span apparaisse (Méthode de vérification de format d'input qui doit être false) -->
        Tous les champs doivent être remplis
      </div>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="w-100 btn btn-primary"
        type="submit"
        @click.prevent="
          () => signUser(this.username, this.password, this.$router)
        "
        :disabled="invalidConnection"
      >
        <!-- Appel de la requête de connexion -->
        <!-- Bouton qui n'apparait pas si les champs ne sont pas remplis -->
        Se connecter
      </button>
    </form>
  </main>
  <footerPage />
</template>

<style scoped>
.btn {
  background-color: var(--greyCG) !important;
  color: white;
  border-color: var(--greyCG) !important;
}

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
