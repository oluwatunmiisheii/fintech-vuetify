import { apiClient } from "@/services/axios";
export default {
  namespaced: true,
  state: {
    paymentHistories: null,
    loading: false
  },

  mutations: {
    SET_PAYMENT_HISTORIES(state, paymentHistories) {
      state.paymentHistories = paymentHistories
    },
    IS_FETCHING_PAYMENT_HISTORY(state, loading) {
      state.loading = loading
    }
  },

  actions: {
    async asyncGetPaymentHistory({commit}, anssid_number) {
      const url = "/payment_histories";
      commit('IS_FETCHING_PAYMENT_HISTORY', true)
      try {
        const {data} = await apiClient.get(url, {id: anssid_number});
        commit('SET_PAYMENT_HISTORIES', data)
        console.log(data)
        return data
      } catch (paymentHistoryError) {
        console.log('payment History Error', paymentHistoryError)
        throw new Error(paymentHistoryError.response.data.message);
      }finally {
        commit('IS_FETCHING_PAYMENT_HISTORY', false)
      }
    },

    async deletePaymentHistory(_, id) {
      const url = `/payment_histories/${id}`;
      try {
        const {data} = await apiClient.delete(url);
        console.log(data)
        return data
      } catch (deletePaymentHistoryError) {
        console.log('payment History Error', deletePaymentHistoryError)
        throw new Error(deletePaymentHistoryError.response.data.message);
      }
    },

    async editPaymentHistory(_, {id, ...rest}) {
      const url = `/payment_histories/${id}`;
      try {
        const {data} = await apiClient.put(url, rest);
        console.log(data)
        return data
      } catch (editPaymentHistoryError) {
        console.log('payment History Error', editPaymentHistoryError)
        throw new Error(editPaymentHistoryError.response.data.message);
      }
    }
  }
};
