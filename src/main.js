import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { apiClient } from "@/services/axios";

Vue.config.productionTip = false

// conditional logic to check if user there is a valid token
if (localStorage.getItem('token')) {
  let token = localStorage.getItem("token");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
