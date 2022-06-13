import homePage from "../Components/pages/homePage.vue";
import signinPage from "../Components/pages/signinPage.vue";
import profilPage from "../Components/pages/profilePage.vue";
import editProfil from "../Components/pages/editProfile.vue";
import signupPage from "../Components/pages/signupPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { guardReactiveProps } from "vue";
// Import des deux méthodes utilisées pour créer le router

const routes = [
  { path: "/signup", component: signupPage },
  { path: "/signin", component: signinPage },
  { path: "/home", component: homePage },
  { path: "/profile", component: profilPage },
  { path: "/edit", component: editProfil },
  { path: "/", redirect: "/signup" },
];
// Configuration des routes de l'application

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Création des routers via la méthode VueRouter de vue-router
// Configuration de l'historique à utiliser

router.beforeEach((to, from) => {
  if (verifyLogin(to)) {
    return router.push("/signin");
  }
});
// Appel de la fonction qui vérifie les 3 étapes pour autoriser l'accès aux pages privées.
// Si vérification incorrecte, redirection vers /signin.

function verifyLogin(to) {
  if (!isPrivatePage(to)) return false;
  if (!isTokenInCache()) return true;
  if (!isTokenValid()) return true;
  return false;
}
// Fonction qui vérifie si l'utilisateur est sur une page privée avec un token valide dans le localStorage.
// Si la page est privée mais qu'il n'y a aucun token dans le local on redirige l'utilisateur vers la page signin.
// Si la page contient un token mais qu'il n'est pas valide, on le redirige vers la page signin.
// Si tout est ok (page privée avec token en cache valide alors la fonction ne sera pas appeler dans le router.beforeEach)

function isPrivatePage(to) {
  const publicPages = ["/signin", "/signup"];
  return !publicPages.includes(to.path);
}
// Vérfication de la page où l'utilisateur se situe.
// Définition des pages accessibles à tous.

function isTokenInCache() {
  return localStorage.getItem("token") != null;
}
// Vérification si un token est dans le Local Storage.

function isTokenValid() {
  const token = localStorage.getItem("token");
  return token === "token";
}
// Fonction de vérification de Token.

export { router };
