import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import paymentHistory from "./modules/paymentHistory";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    paymentHistory
  }
});
