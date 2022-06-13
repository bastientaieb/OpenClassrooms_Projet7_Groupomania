import { createApp } from "vue";
// Import depuis les node modules (vue)
import BootstrapVue3 from "bootstrap-vue-3";
// Import Bootstrap vue 3
import { router } from "./routes/router";

import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
// Configuration qui vient avec Bootstrap vue 3 (Voir leur documentation)

const app = createApp(App);
// Méthode qui vient de l'import de vue

app.use(BootstrapVue3);

app.use(router);
// Utilisation du router par l'app via le router configuré

app.mount("#app");
// Il push tout le contenu à l'endroit de la Div App
