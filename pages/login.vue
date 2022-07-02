<template>
  <v-row justify="center" align="center" style="height: 80vh;">
    <v-row  justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <signIn v-if="!getRegister && !getForgotPassword" @toggleRegister="toggleRegister" @toggleForgotPassword="toggleForgotPassword" />
        <register v-if="getRegister" @toggleRegister="toggleRegister"/>
        <ForgotPassword v-if="getForgotPassword" @toggleForgotPassword="toggleForgotPassword"/>
        </v-col>
    </v-row> 
  </v-row>
</template>

<script>
import signIn from '~/components/signIn.vue'
import register from '~/components/register.vue'
import forgotPassword from '~/components/forgotPassword.vue'
export default {
  component: {
    signIn,register,forgotPassword
  },
  data() {
    return {
      getRegister: false,
      getForgotPassword: false,
    }
  },
   methods: {
    toggleRegister() {
      this.getRegister = !this.getRegister;
    },
    toggleForgotPassword() {
      this.getForgotPassword = !this.getForgotPassword;
    },
    
  },
}
</script>

<style scoped>

</style>
