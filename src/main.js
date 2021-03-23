import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { apiClient } from "@/services/axios";
import vuetify from './plugins/vuetify';
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";

Vue.use(VueIziToast);

Vue.config.productionTip = false

// set application base url
apiClient.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// conditional logic to check if user there is a valid token
if (localStorage.getItem('token')) {
  let token = localStorage.getItem("token");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
