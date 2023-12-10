import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";
import { createApp } from "vue";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";
import "@assets/scss/global.scss";

import quasarLang from "quasar/lang/es";
import router from "@router/index";
import App from "@app/App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Quasar, {
  lang: quasarLang,
  plugins: {
    Notify,
  },
  config: {
    brand: {
      primary: "#6c4fa1",
      secondary: "#4a2c8e",
      accent: "#465783",

      dark: "#2b2b2b",
      "dark-page": "#212121",

      positive: "#1ea660",
      negative: "#cc2f41",
      info: "#28afc9",
      warning: "#ab8b32",
    },
    // notify: {...}, // default set of options for Notify Quasar plugin
    // loading: {...}, // default set of options for Loading Quasar plugin
    // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
});

app.mount("#app");
