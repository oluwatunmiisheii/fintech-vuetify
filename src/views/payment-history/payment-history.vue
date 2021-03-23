<template>
  <v-row justify="center" class="my-3">
    <v-col
      cols="12"
      xl="8"
      md="12"
      sm="12"
    >
      <!-- logout button -->
      <v-row justify="end">
        <v-col
          cols="12"
          xl="4"
          md="3"
          sm="12"
        >
          <div class="text-right">
            <v-btn
              color="info"
              class="text-capitalize"
              depressed
              @click="logout"
            >
              Logout
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- welcome text -->
      <v-row justify="center" class="mt-12">
        <v-col
          cols="12"
          xl="6"
          md="3"
          sm="12"
        >
          <div class="text-center">
            <h3 class="text-h5 font-weight-medium">Good Morning Bernard</h3>
          </div>
        </v-col>
      </v-row>
      
      <!-- search box -->
      <v-row justify="center" class="mt-16">
        <v-col
          cols="12"
          xl="3"
          lg="4"
          md="6"
          sm="12"
        >
          <div class="text-center">
            <search-for-payment-history-form @setAnssidNo="setAnssidNo" />
          </div>
        </v-col>
      </v-row>

      <!-- table -->
       <v-row justify="center" class="mt-16">
        <v-col cols="12">
          <payment-history-table 
            :anssid-number="anssidNumber"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import SearchForPaymentHistoryForm from '@/components/forms/searchForPaymentHistoryForm'
  import PaymentHistoryTable from '@/components/tables/paymentHistoryTable'
export default {
  components: {
    SearchForPaymentHistoryForm,
    PaymentHistoryTable
  },
  data() {
    return {
      anssidNumber: ''
    }
  },
  methods: {
    setAnssidNo(value) {
      console.log(value)
      this.anssidNumber = value
    },
    logout() {
      localStorage.clear()
      this.$router.replace({path: '/'})
    }
  }
}
</script>