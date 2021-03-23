<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <!-- email -->
    <v-text-field
      label="Anssid Number"
      v-model="anssid_number"
      :rules="[rules.required, rules.min]"
      placeholder=""
      color="blue darken-2"
      outlined
    ></v-text-field>

    <!-- submit button -->
    <div class="text-center">
      <v-btn
        :disabled="!valid || isSubmitting"
        color="info"
        depressed
        :loading="isSubmitting"
        @click="getPaymentHistory"
      >
        Submit
      </v-btn>
    </div>
  </v-form>
</template>

<script>
  import {notifications} from "@/mixins/notifications"
  export default {
    mixins: [notifications],
    data () {
      return {
        isSubmitting: false,
        valid: true,
        showPassword: false,
        anssid_number: "",
        rules: {
          required: value => !!value || 'Required.',
          min: v => (v && v.length >= 5) || 'Min 5 characters',
        },
      }
    },

    methods: {
      resetForm () {
        this.$refs.form.reset()
      },

      resetValidation () {
        this.$refs.form.resetValidation()
      },

      async getPaymentHistory() {
        const isValid = this.$refs.form.validate()
        if(isValid === false) {
          return
        }
        this.isSubmitting = true
        try {
          const response = await this.$store.dispatch('paymentHistory/asyncGetPaymentHistory', this.anssid_number)
          this.showSuccessNotification(response.message)
          this.$emit('setAnssidNo', this.anssid_number)
        }catch(error) {
          this.showErrorNotification(error.message)
        }finally {
          this.isSubmitting = false
        }
      }
    },
  }
</script>