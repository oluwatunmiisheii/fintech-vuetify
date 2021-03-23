<template>
  <v-row justify="center" align="center" class="mt-10">
    <v-col
      cols="12"
      xl="2"
      md="3"
      sm="12"
    >
      <div class="text-center mb-5">
        <h3 class="text-h4 font-weight-medium">Login</h3>
      </div>
      <login-form />
    </v-col>
  </v-row>
</template>

<script>
import LoginForm from '@/components/forms/loginForm'
export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>