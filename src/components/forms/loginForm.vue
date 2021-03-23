<template>
  <v-form
    ref="loginForm"
    v-model="valid"
    lazy-validation
  >
    <!-- email -->
    <v-text-field
      label="Email"
      v-model="loginDetails.email"
      :rules="[rules.required, rules.email]"
      placeholder=""
      color="blue darken-2"
      outlined
    ></v-text-field>

    <!-- password -->
    <v-text-field
      label="Password"
      v-model="loginDetails.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showPassword ? 'text' : 'password'"
      color="blue darken-2"
      placeholder=""
      @click:append="showPassword = !showPassword"
      outlined
    ></v-text-field>

    <!-- submit button -->
    <div class="text-center">
      <v-btn
        :disabled="!valid || isSubmitting"
        color="primary"
        depressed
        :loading="isSubmitting"
        @click="login"
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
        loginDetails: {
          email: '',
          password: '',
        },
        rules: {
          required: value => !!value || 'Required.',
          min: v => (v && v.length >= 5) || 'Min 5 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
    },

    computed: {
      form () {
        return {
          password: this.login.email,
          email: this.login.password,
        }
      },
    },

    methods: {
      async login () {
        const isValid = this.$refs.loginForm.validate()
        if(isValid === false) {
          return
        }
        this.isSubmitting = true
        try {
          const response = await this.$store.dispatch('auth/asyncLogin', this.loginDetails)
          this.resetLoginForm()
          this.showSuccessLoginNotification()
          console.log(response)
        }catch(loginError) {
          this.showErrorLoginNotification(loginError.message)
        }finally {
          this.isSubmitting = false
        }
      },

      resetLoginForm () {
        this.$refs.loginForm.reset()
      },

      resetValidation () {
        this.$refs.loginForm.resetValidation()
      }
    },
  }
</script>