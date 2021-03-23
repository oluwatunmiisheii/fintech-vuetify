import { apiClient } from "@/services/axios";
export default {
  namespaced: true,
  state: {
   token: null
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },

  actions: {
    async asyncLogin(_, loginDetails) {
      const url = "/auth/login/staff";
      try {
        const {data} = await apiClient.post(url, loginDetails);
        localStorage.setItem('token', data.access_token)
        return data;
      } catch (loginError) {
        throw new Error(loginError.response.data.message);
      }
    },

    async logOut() {
      const url = "/auth/logout";
      try {
        const response = await apiClient.post(url);
        return response;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  }
};
